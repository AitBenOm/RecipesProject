import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import {RecipeService} from "./recipes/recipe.service";
import {DataStorageService} from "./shared/data-storage.service";
import { SigninComponent } from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {RecipesModule} from "./recipes/recipes.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,

    SigninComponent,
    SignupComponent
  ],
  imports: [
    RecipesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
