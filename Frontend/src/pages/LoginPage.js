// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Add any relevant CSS for styling

const LoginPage = () => {
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Mock admin credentials for demo purposes
    const adminCredentials = {
        email: 'admin@example.com',
        password: 'password123'
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();

        // Mock login validation
        if (adminEmail === adminCredentials.email && adminPassword === adminCredentials.password) {
            // On successful login, redirect to AdminFoodList
            navigate('/admin-food-list');
        } else {
            // Set error message if credentials don't match
            setErrorMessage('Invalid email or password');
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-sections">
                {/* Admin Login Section */}
                <div className="login-section admin-login">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleAdminLogin}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>

                {/* Customer login can be added later */}
                <div className="login-section customer-login">
                    <h2>Customer Login (Coming Soon)</h2>
                    {/* Customer login functionality can be implemented here */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
