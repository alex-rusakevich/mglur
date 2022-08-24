from flask import Flask, render_template
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
import json

app = Flask(
    __name__,
    static_url_path="/static",
    static_folder="../static",
    template_folder="../"
)
app.jinja_options["finalize"] = lambda value: "" if value is None else value
app.wsgi_app = ProxyFix(app.wsgi_app)
CORS(app, send_wildcard=True)


class NonASCIIJSONEncoder(json.JSONEncoder):
    def __init__(self, **kwargs):
        kwargs["ensure_ascii"] = False
        super(NonASCIIJSONEncoder, self).__init__(**kwargs)


app.json_encoder = NonASCIIJSONEncoder


@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")