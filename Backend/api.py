import requests

def get_ingredients(food_name):
    api_key = '0b5c63930f134504bcce5165c5daff74'  # Your API key
    url = f'https://api.spoonacular.com/food/ingredients/autocomplete?query={food_name}&number=5&apiKey={api_key}'
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        ingredients = [ingredient['name'] for ingredient in data]
        return ingredients
    else:
        print("Error:", response.status_code, response.text)
        return []
