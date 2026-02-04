import os
from flask import Flask, jsonify
from azure.storage.blob import BlobServiceClient
import yaml
import json
from dotenv import load_dotenv

from flask_caching import Cache

load_dotenv()

config = {"DEBUG": True, "CACHE_TYPE": "SimpleCache", "CACHE_DEFAULT_TIMEOUT": 60}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)

connection_string = os.environ["AZURE_STORAGE_CONNECTION_STRING"]
container_name = os.environ["AZURE_CONTAINER_NAME"]
blob_service_client = BlobServiceClient.from_connection_string(connection_string)
container_client = blob_service_client.get_container_client(container_name)


def read_blob(blob_name):
    blob_client = container_client.get_blob_client(blob_name)
    data = blob_client.download_blob().readall()
    if blob_name.lower().endswith((".yaml", ".yml")):
        return yaml.safe_load(data)
    elif blob_name.lower().endswith(".json"):
        return json.loads(data)
    return data.decode("utf-8")


@app.route("/")
@cache.cached(timeout=60)
def hello_world():
    return "<p>This is the landing page !</p>"


@app.route("/api/events")
@cache.cached(timeout=60)
def get_events():
    return jsonify(read_blob("events.YAML"))


@app.route("/api/news")
@cache.cached(timeout=60)
def get_news():
    return jsonify(read_blob("news.JSON"))


@app.route("/api/faq")
@cache.cached(timeout=60)
def get_faq():
    return jsonify(read_blob("faq.YAML"))


@app.route("/healthz")
def health_check():
    return jsonify({"status": "healthy"}), 200


@app.route("/readyz")
def get_readyz():
    return "<h1>Readyz page</h1>"
