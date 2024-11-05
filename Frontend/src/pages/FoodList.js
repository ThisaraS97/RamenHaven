// src/pages/FoodList.js
import React from 'react';

const FoodList = ({ foods }) => {
    return (
        <div>
            <h2>Food List</h2>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>
                        <h3>{food.name}</h3>
                        <p>Type: {food.type}</p>
                        <p>Price: {food.price}</p>
                        <p>Spicy Level: {food.spicy_level}</p>
                        <p>Available: {food.available ? 'Yes' : 'No'}</p>
                        <p>
                            Ingredients: {Array.isArray(food.ingredients) ? food.ingredients.join(', ') : 'No ingredients provided'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;
