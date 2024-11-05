// src/components/UpdateFood.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/food/${id}`)
      .then(response => {
        setFood(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching food data');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', food.name);
    formData.append('type', food.type);
    formData.append('ingredients', food.ingredients);
    formData.append('price', food.price);
    formData.append('spicy_level', food.spicy_level);
    formData.append('available', food.available);
    formData.append('image', food.image);

    // Handle image upload if any
    const fileInput = document.getElementById('image');
    if (fileInput.files[0]) {
      formData.append('image', fileInput.files[0]);
    }

    axios.put(`http://127.0.0.1:5000/update/${id}`, formData)
      .then(() => {
        navigate('/admin-food-list'); // Redirect after successful update
      })
      .catch(err => {
        setError('Error updating food item');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Food Item</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={food.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Type:</label>
          <input type="text" name="type" value={food.type} onChange={handleChange} required />
        </div>
        <div>
          <label>Ingredients (comma-separated):</label>
          <input type="text" name="ingredients" value={food.ingredients} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={food.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Spicy Level:</label>
          <input type="number" name="spicy_level" value={food.spicy_level} onChange={handleChange} required />
        </div>
        <div>
          <label>Available:</label>
          <input type="checkbox" name="available" checked={food.available} onChange={e => handleChange({ target: { name: 'available', value: e.target.checked } })} />
        </div>
        <div>
          <label>Image:</label>
          <input type="image" name="Image" src={food.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" id="image" />
        </div>
        <button type="submit">Update Food</button>
      </form>
    </div>
  );
};

export default UpdateFood;
