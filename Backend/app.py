from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
import requests # Import requests library for API calls
import cloudinary
import cloudinary.uploader
from flask import jsonify
from bson.errors import InvalidId

app = Flask(__name__)
CORS(app)

# Configure Cloudinary
cloudinary.config(
    cloud_name='dzoxec7r8',
    api_key='241967295832718',
    api_secret='CBUI-3SHEVOhtH5bAD0P5Jloki0'
)

# MongoDB Atlas connection
client = MongoClient('mongodb+srv://root:root@cluster0.v9pau.mongodb.net/ramenhaven?retryWrites=true&w=majority')
db = client['ramenhaven']  # Database name
collection = db['foods']  # Collection name

# Set the folder for image uploads
UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Welcome route
@app.route('/')
def home():
    return "Welcome to the MongoDB-Backend API!"

# Create (POST) with image upload
@app.route('/add', methods=['POST'])
def add_food():
    data = request.form.to_dict()
    
    # Get the ingredients as a list from form data
    ingredients = request.form.getlist('ingredients')  # Expecting multiple ingredients
    data['ingredients'] = ingredients
    
    file = request.files['image']  # Get the uploaded image

    if file:
        # Upload the image to Cloudinary
        try:
            upload_result = cloudinary.uploader.upload(file)
            data['image'] = upload_result['secure_url']  # Get the URL of the uploaded image
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    collection.insert_one(data)
    return jsonify({"message": "Food item added successfully!"}), 201

# Read (GET)
@app.route('/foods', methods=['GET'])
def get_foods():
    try:
        # Retrieve all food items from the collection
        foods = list(collection.find())

        # Convert ObjectId to string and format the food data
        for food in foods:
            food['_id'] = str(food['_id'])  # Convert ObjectId to string for JSON serialization
            # Ensure Cloudinary image URLs are correctly formatted
            if 'image' in food and not food['image'].startswith('http'):
                food['image'] = f"http://res.cloudinary.com/your-cloud-name/image/upload/v{food['image']}"

        # Return the formatted list of food items
        return jsonify(foods), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Retrieve a specific food item by ID (GET)
@app.route('/food/<id>', methods=['GET'])
def get_food_by_id(id):
    try:
        # Attempt to convert the string ID to an ObjectId
        food = collection.find_one({'_id': ObjectId(id)})
        if food:
            food['_id'] = str(food['_id'])  # Convert ObjectId to string for JSON response
            return jsonify(food), 200  # Return the food item with a 200 OK status
        else:
            return jsonify({"error": "Food item not found"}), 404  # Return 404 if not found
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400  # Handle invalid ObjectId format
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Catch any other unexpected errors

# Update (PUT) route to update a food item by ID
@app.route('/update/<id>', methods=['PUT'])
def update_food(id):
    data = request.form.to_dict()  # Get the form data
    file = request.files.get('image')  # Get the uploaded image if any
    
    # Convert ingredients to list if provided
    ingredients = request.form.getlist('ingredients')
    if ingredients:
        data['ingredients'] = ingredients

    if file:
    # Upload the image to Cloudinary
        try:
            upload_result = cloudinary.uploader.upload(file)
            data['image'] = upload_result['secure_url']  # Get the URL of the uploaded image
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Update the document in MongoDB
    collection.update_one({'_id': ObjectId(id)}, {'$set': data})
    
    return jsonify({"message": "Food item updated successfully!"}), 200

# Delete (DELETE)
@app.route('/delete/<id>', methods=['DELETE'])
def delete_food(id):
    collection.delete_one({'_id': ObjectId(id)})
    return jsonify({"message": "Food item deleted successfully!"})

# Suggest ingredients based on food name (GET)
@app.route('/suggest', methods=['GET'])
def suggest_ingredients():
    food_name = request.args.get('food_name')
    if not food_name:
        return jsonify({"error": "No food name provided"}), 400
    
    # Call Spoonacular API for ingredient suggestions
    api_key = '0b5c63930f134504bcce5165c5daff74'  # Your API key
    url = f'https://api.spoonacular.com/food/ingredients/autocomplete?query={food_name}&number=5&apiKey={api_key}'
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        ingredients = [ingredient['name'] for ingredient in data]
        return jsonify({'ingredients': ingredients}), 200
    else:
        print("Error:", response.status_code, response.text)
        return jsonify({'error': 'Failed to retrieve ingredients'}), 500
    
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_input = request.json.get('message')

    # Update the model to gpt-3.5-turbo or gpt-4
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can use "gpt-4" as well
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_input},
        ]
    )
    return jsonify({"response": response['choices'][0]['message']['content']})


if __name__ == '__main__':
    app.run(debug=True)
