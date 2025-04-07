import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Recipe Book</h1>
      <Link to="/add-recipe" className="add-recipe-button">➕ Add Recipe</Link>
      
      {recipes.length === 0 ? (
        <p className="no-recipes">No recipes found. Start adding some delicious meals! 🍕🍜</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              id={recipe.id} 
              title={recipe.title} 
              image={recipe.image} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
