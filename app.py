from flask import Flask, jsonify
from flask_caching import Cache

config = {"DEBUG": True, "CACHE_TYPE": "SimpleCache", "CACHE_DEFAULT_TIMEOUT": 60}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)


@app.route("/")
@cache.cached(timeout=60)
def hello_world():
    return "<p>This is the landing page !</p>"


@app.route("./api/events")
@cache.cached(timeout=60)
def get_events():
    return "<h1>Event page</h1>"


@app.route("./api/news")
@cache.cached(timeout=60)
def get_news():
    return "<h1>News page</h1>"


@app.route("./api/faq")
@cache.cached(timeout=60)
def get_faq():
    return "<h1>Faq page</h1>"


@app.route("/healthz")
def health_check():
    return jsonify({"status": "healthy"}), 200


@app.route("/readyz")
def get_readyz():
    return "<h1>Readyz page</h1>"
