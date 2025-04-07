import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import AddEditRecipePage from "./pages/AddEditRecipePage";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
        <h1>Recipe Book</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-recipe">Add Recipe</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          <Route path="/add-recipe" element={<AddEditRecipePage />} />
          <Route path="/edit-recipe/:id" element={<AddEditRecipePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
