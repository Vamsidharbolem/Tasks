import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useRecipes = () => {
  return useSelector((state: RootState) => state.recipes.recipes);
};
