import { useEffect, useState } from "react";
import RecipesService from "./shared/services/recipes.service";
import { RecipeData } from "./shared/models/recipe-model";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './pages/login-component';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
