import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainPage.css'; // CSS file for styling
import SearchBar from '../components/SearchBar';
import ImageSlider from '../components/ImageSlider';


const MainPage = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]); // Filtered food data

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:5000/foods'); // Fetch from your backend
                setFoods(response.data);
                setLoading(false);
                setFilteredFoods(response.data); // Initially display all foods
            } catch (err) {
                setError('Error fetching food items');
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Handle dynamic search filtering
    const handleSearch = (query) => {
        if (query === '') {
            setFilteredFoods(foods); // If query is empty, show all foods
        } else {
            const filtered = foods.filter(food => 
                food.name.toLowerCase().includes(query.toLowerCase()) || 
                food.ingredients.join(', ').toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFoods(filtered); // Update the filtered foods based on search
        }
    };

    return (
        <div className="food-list-container">
            {/* Add the SearchBar component */}
            <SearchBar onSearch={handleSearch} />
            <ImageSlider />
            <h2>Our Menu</h2>

            <div className="food-list">
                {filteredFoods.map((food) => (
                    <div key={food._id} className="food-item">
                        <div className="food-inner">
                            {/* Front Side */}
                            <div className="food-front">
                                {/* Display the correct image URL */}
                                <img 
                                    src={food.image}  // Cloudinary or backend URL
                                    alt={food.name} 
                                    className="food-image"
                                />
                                <h3>{food.name}</h3>
                            </div>

                            {/* Back Side */}
                            <div className="food-back">
                                <p className="food-details">
                                    <strong>Ingredients:</strong> {food.ingredients.join(', ')} <br/>
                                    <strong>Price:</strong> ${food.price} <br/>
                                    <strong>Spicy Level:</strong> {food.spicy_level}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
