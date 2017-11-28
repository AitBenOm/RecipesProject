import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared/shared.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {AuthModule} from "./Auth/auth.module";
import {CoreModule} from "./Core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {shoppingListReducer} from "./shopping-list/Store/shopping-list.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    ShoppingListModule,
    AuthModule,
    HttpModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // StoreModule.forRoot({shoppingList: shoppingListReducer})
    StoreModule.provideStore({shoppingList: shoppingListReducer})
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
