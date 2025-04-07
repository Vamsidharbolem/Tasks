import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("recipes");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("recipes", serializedState);
  } catch (err) {
    console.error("Failed to save state", err);
  }
};

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
  preloadedState: { recipes: { recipes: loadState() || [] } },
});

store.subscribe(() => {
  saveState(store.getState().recipes.recipes);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
