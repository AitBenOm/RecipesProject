import { Injectable } from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import "rxjs/Rx";
import {AuthService} from "../Auth/auth.service";
import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";


@Injectable()
export class DataStorageService {

  constructor( private httpClient: HttpClient,

               private RecipeService: RecipeService,
               private authService: AuthService) {}


  saveRecipes(){
    const token= this.authService.getTokecn();
   // const headers = new HttpHeaders().set('Authorization', 'totototototottototo');
    console.log("put Metode"+this.RecipeService.getRecipes().length);

   // return this.httpClient.put('https://recipes-ng.firebaseio.com/data.json', {
   //   observe: 'body',
   //   responseType: 'json',
   //   params:  new HttpParams().set('auth', token)
   // });

    const req = new HttpRequest('PUT', 'https://recipes-ng.firebaseio.com/data.json',
      this.RecipeService.getRecipes(), {reportProgress: true});

 return this.httpClient.request(req);
  }
  getRecipes(){

    const token= this.authService.getTokecn();

     // this.http.get<Recipe[]>('https://recipes-ng.firebaseio.com/data.json?auth='+ token)
     this.httpClient.get<Recipe[]>('https://recipes-ng.firebaseio.com/data.json', {
       observe: 'body',
       responseType: 'json'
     })
      .map(
     // (response: Response) =>{
      (recipes) =>{
        console.log(recipes)
       //const recipes: Recipe[] = response.json();
        for (let recipe of recipes){
          if(!recipe['shippingListState']){
            recipe['shippingListState'] = [];
          }
        }
        return recipes;

      }
    )
      .subscribe(
      (recipes: Recipe[]) =>{
        this.RecipeService.setRecipes(recipes);
      }

    );
  }

}
