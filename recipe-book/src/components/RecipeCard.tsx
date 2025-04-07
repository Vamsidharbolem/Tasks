import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./RecipeCard.css"; // Ensure this file exists

interface RecipeCardProps {
  id: string;
  title: string;
  image?: string;
  description?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image, description }) => {
  return (
    <motion.div
      className="recipe-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/recipe/${id}`} className="recipe-link">
        <div className="recipe-image-container">
          <img 
            src={image || "https://via.placeholder.com/300"} 
            alt={title} 
            className="recipe-image" 
          />
        </div>
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-description">{description || "No description available."}</p>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;