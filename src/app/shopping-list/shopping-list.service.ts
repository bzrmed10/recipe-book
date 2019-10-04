import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients : Ingredient[] = [
    new Ingredient("Apples",5),
    new Ingredient("Tomoatos",15)
  ]
  
  constructor() { }

  getIngredient(){
    return this.ingredients.slice();
  }
  getIngredientByIndex(index : number){
    return this.ingredients[index];
  }

  addNewIgr(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    
  }

  addIngridients(ingredients : Ingredient[]){
    
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  updateIngredient(index : number , newIngredient : Ingredient){
    this.ingredients[index] = newIngredient; 
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  deleteIngrediant(index : number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
