import { Component } from '@angular/core';
import {RecipeService} from "../recipes/recipe.service";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorage: DataStorageService){}

  onSaveRecipes(){
    this.dataStorage.saveRecipes();
  }
  onFetchRecipes(){
    this.dataStorage.getRecipes();
  }
}
