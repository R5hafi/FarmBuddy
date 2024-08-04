from flask import Flask, jsonify
from flask_cors import CORS
import random
import requests

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])

@app.route('/')
def main():
    client_id = "OWfTxB3Xz1oVbzLe00eR71U9d5UmWPVkPhd_O9DTLvo"
    url = f"https://api.unsplash.com/search/photos?query=sunflower&client_id={client_id}"
    #this is getting a url for an image of a sunflower
    # return 'very cool API!!'
    try:
        req = requests.get(url)
        req.raise_for_status() 
        data = req.json()
        
        if 'results' in data and len(data['results']) > 0:
            # Choose a random photo from the results
            random_photo = random.choice(data['results'])
            image_url = random_photo['urls']['regular']
            return jsonify({"image_url": image_url})  # Return the image URL as JSON
        else:
            return jsonify({"error": "No results found"}), 404
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), 500
    except Exception as err:
        return jsonify({"error": f"Other error occurred: {err}"}), 500
    


@app.route('/data')
def data():
   return {"Percentage" :random.randint(0, 100)}


if __name__ == "__main__":
  app.run(debug=True)