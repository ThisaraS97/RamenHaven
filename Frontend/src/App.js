// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminFoodList from './pages/AdminFoodList';
import AddFood from './pages/AddFood';
import UpdateFood from './pages/UpdateFood'; // Import UpdateFood component
import FloatingChatbot from './components/FloatingChatbot'; // Import the FloatingChatbot component\
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
       {/*} <nav>
         <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/add-food">Add Food</a></li>
            <li><a href="/admin-food-list">Admin Food List</a></li>
            <li><a href = "/main-page">Main Page</a></li>
            <li><a href="/login-page">Login Page</a></li>
          </ul>
         
        </nav> 
        */}

        {/* Define the routes for navigation */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/admin-food-list" element={<AdminFoodList />} />
          <Route path="/update-food/:id" element={<UpdateFood />} /> 
          <Route path='/login-page' element={<LoginPage/>}></Route>
          <Route path="/" element={<h1>Welcome to Food Management</h1>} />
          <Route path="//main-page" element={<MainPage />} />  

        </Routes>

        {/* Add the floating chatbot so it appears on all screens */}
        <FloatingChatbot />

      </div>
      <Footer />
    </Router>
  );
}

export default App;
