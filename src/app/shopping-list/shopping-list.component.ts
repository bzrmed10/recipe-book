import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {

ingredients : Ingredient[] ;
private ngChangeSub : Subscription;

  constructor(private shoppingListService : ShoppingListService ) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.ngChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[] ) =>{
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index : number){
      this.shoppingListService.startedEditing.next(index);

  }

   ngOnDestroy(){
     this.ngChangeSub.unsubscribe();
   }

}
