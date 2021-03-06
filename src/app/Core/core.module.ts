import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared/shared.module";
import {AppRoutingModule} from "../app-routing.module";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {RecipeService} from "../recipes/recipe.service";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../Auth/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {Auth} from "../shared/auth.interceptor";
import {LoggingInterceptor} from "../shared/logging-interceptor";


@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: Auth, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    ]
})
export class CoreModule { }
