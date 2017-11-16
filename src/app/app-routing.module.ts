import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {HomeComponent} from "./Core/home/home.component";
import {AuthGuard} from "./auth.guard";



const appRoutes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule'},
    { path: '', component: HomeComponent },
    { path: 'shopping-list', component: ShoppingListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
