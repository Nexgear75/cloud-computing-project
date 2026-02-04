import os
from flask import Flask, jsonify
from azure.storage.blob import BlobServiceClient
from azure.core.exceptions import AzureError
import yaml
import json
from dotenv import load_dotenv
from flask_caching import Cache

load_dotenv()

config = {"DEBUG": True, "CACHE_TYPE": "SimpleCache", "CACHE_DEFAULT_TIMEOUT": 60}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)

connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
container_name = os.getenv("AZURE_CONTAINER_NAME")
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
    return """
    <p>
    This is the landing page !
    You can acces to the following addresses : 
    \n/api/events
    \n/api/news
    \n/api/faq
    \n/healthz
    \n/readyz
    </p>
    """


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
@cache.cached(timeout=60)
def get_readyz():
    try:
        container_client = blob_service_client.get_container_client(container_name)
        container_client.get_container_properties()

        return jsonify({"status": "ready", "storage": "connected"}), 200

    except AzureError as e:
        app.logger.error(f"Error while trying to connect to Azure Storage : {e}")
        return jsonify({"status": "unready", "reason": "storage_error"}), 503


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
