from flask import Flask

app = Flask("Demo App")

@app.route("/")
def hello():
    return "Hello World!"