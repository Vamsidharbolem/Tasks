import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { addRecipe, editRecipe } from "../redux/recipeSlice";
import { RootState } from "../redux/store";

const AddEditRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((r) => r.id === id)
  );

  const handleSubmit = (recipe: any) => {
    if (existingRecipe) {
      dispatch(editRecipe(recipe));
    } else {
      dispatch(addRecipe(recipe));
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{existingRecipe ? "Edit Recipe" : "Add Recipe"}</h2>
      <RecipeForm initialData={existingRecipe} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditRecipePage;
