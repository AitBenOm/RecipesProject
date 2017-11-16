import { Component } from '@angular/core';
import {RecipeService} from "../../recipes/recipe.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService, private authService: AuthService, private router: Router){}

  onSaveRecipes(){
    this.dataStorage.saveRecipes();
  }
  onFetchRecipes(){
    this.dataStorage.getRecipes();
    this.router.navigate(['recipes']);
    console.log('recipes');
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['']);
    console.log('recipes');
  }
}
