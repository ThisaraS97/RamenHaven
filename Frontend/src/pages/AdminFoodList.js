import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import './AdminFoodList.css';

const AdminFoodList = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]); // State to track selected food items
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:5000/foods');
                setFoods(response.data);
                setFilteredFoods(response.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        fetchFoods();
    }, []);

    const handleSearch = (query) => {
        if (query === '') {
            setFilteredFoods(foods);
        } else {
            const filtered = foods.filter(food =>
                food.name.toLowerCase().includes(query.toLowerCase()) ||
                food.ingredients.join(', ').toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFoods(filtered);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-food/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this food item?")) {
            await axios.delete(`http://localhost:5000/delete/${id}`);
            setFoods(foods.filter(food => food._id !== id));
            setFilteredFoods(filteredFoods.filter(food => food._id !== id));
        }
    };

    // Handle checkbox selection
    const handleCheckboxChange = (id) => {
        if (selectedFoods.includes(id)) {
            setSelectedFoods(selectedFoods.filter(foodId => foodId !== id));
        } else {
            setSelectedFoods([...selectedFoods, id]);
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedFoods.length > 0 && window.confirm("Are you sure you want to delete the selected items?")) {
            try {
                await Promise.all(selectedFoods.map(id => axios.delete(`http://localhost:5000/delete/${id}`)));
                const updatedFoods = foods.filter(food => !selectedFoods.includes(food._id));
                setFoods(updatedFoods);
                setFilteredFoods(updatedFoods);
                setSelectedFoods([]); // Clear selection
            } catch (error) {
                console.error('Error deleting selected items:', error);
            }
        } else {
            alert("No items selected for deletion.");
        }
    };

    return (
        <div className="admin-food-list">
            <h1>Ramen Haven Food List</h1>
            
            {/* SearchBar component */}
            <SearchBar onSearch={handleSearch} />

            <button className="add-new-item-btn" onClick={() => navigate('/add-food')}>
                Add New Item
            </button>

            {/* Bulk delete button */}
            <button className="bulk-delete-btn" onClick={handleBulkDelete} disabled={selectedFoods.length === 0}>
                Delete Selected
            </button>

            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedFoods(filteredFoods.map(food => food._id)); // Select all
                                    } else {
                                        setSelectedFoods([]); // Deselect all
                                    }
                                }}
                                checked={filteredFoods.length > 0 && selectedFoods.length === filteredFoods.length}
                            />
                        </th>
                        <th>Name</th>
                        <th>Ingredients</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map(food => (
                            <tr key={food._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedFoods.includes(food._id)}
                                        onChange={() => handleCheckboxChange(food._id)}
                                    />
                                </td>
                                <td>{food.name}</td>
                                <td>{food.ingredients.join(', ')}</td>
                                <td>{food.price}</td>
                                <td>
                                    <img src={food.image} alt={food.name} className="food-image" />
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(food._id)}>Update</button>
                                    <button onClick={() => handleDelete(food._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No food items found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminFoodList;
