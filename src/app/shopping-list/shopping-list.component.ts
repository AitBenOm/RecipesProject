import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
 this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // console.log("l'indice est : "+index);
    // this.slService.startedEditing.next(index);
  }
}
