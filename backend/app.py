from flask import Flask
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])


@app.route('/')
def main():
    return 'very cool API!!'


@app.route('/data')
def data():
   return {"Percentage" :random.randint(0, 100)}


if __name__ == "__main__":
  app.run()