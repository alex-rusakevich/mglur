from server.main import app
import os, os.path
from livereload import Server


def main():
    os.environ["FLASK_APP"] = os.path.basename(__file__)
    os.environ["FLASK_ENV"] = "development"
    app.debug = True

    server = Server(app.wsgi_app)
    server.watch("./")
    server.serve(port=35729)


if __name__ == "__main__":
    main()
