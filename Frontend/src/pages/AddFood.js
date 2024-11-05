import React, { useState } from 'react';
import axios from 'axios';
import './AddFood.css';

const AddFood = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [suggestedIngredients, setSuggestedIngredients] = useState([]);
    const [price, setPrice] = useState('');
    const [spicyLevel, setSpicyLevel] = useState('');
    const [available, setAvailable] = useState(true);
    const [image, setImage] = useState(null);

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, '']);
    };

    const fetchSuggestedIngredients = async (foodName) => {
        try {
            const response = await axios.get(`http://localhost:5000/suggest?food_name=${foodName}`);
            setSuggestedIngredients(response.data.ingredients);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleNameChange = (e) => {
        const foodName = e.target.value;
        setName(foodName);
        if (foodName) {
            fetchSuggestedIngredients(foodName);
        } else {
            setSuggestedIngredients([]);
        }
    };

    const resetForm = () => {
        setName('');
        setType('');
        setIngredients(['']);
        setPrice('');
        setSpicyLevel('');
        setAvailable(true);
        setImage(null);
        setSuggestedIngredients([]); // Clear suggested ingredients after submission
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        ingredients.forEach((ingredient) => {
            formData.append('ingredients', ingredient);
        });
        formData.append('price', price);
        formData.append('spicy_level', spicyLevel);
        formData.append('available', available);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            resetForm(); // Reset the form after successful submission
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-food-form">
            <div className="add-food-container">
                <h2>Add Food Item</h2>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={handleNameChange} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Type" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    required 
                />
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-input">
                        <input
                            type="text"
                            placeholder="Ingredient"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addIngredientField} className="add-ingredient-button">
                    Add Ingredient
                </button>
                {suggestedIngredients.length > 0 && (
                    <div className="suggested-ingredients">
                        <h4>Suggested Ingredients:</h4>
                        <ul>
                            {suggestedIngredients.map((ingredient, index) => (
                                <li key={index} onClick={() => handleIngredientChange(ingredients.length - 1, ingredient)}>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Spicy Level" 
                    value={spicyLevel} 
                    onChange={(e) => setSpicyLevel(e.target.value)} 
                    required 
                />
                <label>
                    Available:
                    <input 
                        type="checkbox" 
                        checked={available} 
                        onChange={(e) => setAvailable(e.target.checked)} 
                    />
                </label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setImage(e.target.files[0])} 
                />
                <button type="submit" className="submit-button">Add Food</button>
            </div>
        </form>
    );
};

export default AddFood;
