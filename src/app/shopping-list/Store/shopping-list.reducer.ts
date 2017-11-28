import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface AppState {
  shoppingList: State
}

export interface State{
ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1

}
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions){
switch (action.type){
  case ShoppingListActions.ADD_INGREDIENT:
    return{
      ...state,
      ingredients: [...state.ingredients, action.payload]
    };
  case ShoppingListActions.ADD_INGREDIENTS:
  return {
    ... state,
    ingredients: [...state.ingredients, ...action.payload]
  };
  case ShoppingListActions.UPDATE_INGREDIENT:
  const ingredient = state.ingredients[action.payload.index];
  const updatedIngredient = {
    ...ingredient,
    ...action.payload.ingredient
  };
  const ingredientsU = [...state.ingredients];
  ingredientsU[action.payload.index]= updatedIngredient;
  return {
    ... state,
    ingredients: ingredientsU
  };
  case ShoppingListActions.DELETE_INGREDIENT:
    const ingredients = [...state.ingredients];
    ingredients.splice(action.payload, 1);
  return {
    ... state,
    ingredients: ingredients
  };
  case ShoppingListActions.START_EDIT:
    const editedIngredient = {...state.ingredients[action.payload]};
    ingredients.splice(action.payload, 1);
  return {
    ... state,
    editedIngredient: editedIngredient,
    editedIngredientIndex: action.payload
  }
  default:
    return state;
}

}
