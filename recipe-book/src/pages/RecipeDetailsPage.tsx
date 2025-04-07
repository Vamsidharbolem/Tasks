import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { deleteRecipe } from "../redux/recipeSlice";

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === id)
  );

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(recipe.id));
    navigate("/");
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} width="200" />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default RecipeDetailsPage;
