import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs/Subject";
import "rxjs/Rx";
import {Http, Response} from "@angular/http";

@Injectable()
export class RecipeService {
  reciepAdded= new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService, private http: Http) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  // addRecipe(){
  //   this.reciepAdded.subscribe(
  //     (recipe: Recipe) =>{
  //       this.recipes.push(recipe);
  //       this.recipesChanged.next(this.recipes);
  //     }
  //   );
  //
  // }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, Nrecipe: Recipe){
    this.recipes[index] = Nrecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  saveRecipes(){
   return this.http.put('https://recipes-ng.firebaseio.com/data.json', this.recipes);
  }
  GetRecipes(){
    return this.http.get('https://recipes-ng.firebaseio.com/data.json').map(
      (response: Response) =>{
        const data = response.json();
        console.log(data);
        return data;
      }

    ).subscribe(
      (recies: Recipe[]) =>{
        console.log(recies);
        this.recipes = recies;
      }
    );
  }

}
