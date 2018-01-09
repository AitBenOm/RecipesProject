import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

@Injectable()
export class AuthService {

  private token: string;
  constructor(private recipeService: RecipeService) { }

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }
  signinUser(email: string, pwd: string){
    firebase.auth().signInWithEmailAndPassword(email, pwd).then(
      response =>{
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.token= token
          );
      }
    ).catch(
      error => console.log(error)
    );
  }


  getTokecn(){
    firebase.auth().currentUser.getToken()
      .then(
      (token: string) => {
        this.token = token;

      }

    );
    return this.token;
  }
  logout(){
    const recipe: Recipe[]= [];
    firebase.auth().signOut();
    this.recipeService.setRecipes(recipe);
    this.token=null;
  }
  ifAuthenticated(){

    return this.token != null;
  }
}
