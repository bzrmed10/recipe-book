import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  recipeChanged = new Subject<Recipe[]>();

  private recipes :Recipe[] = [
    new Recipe("name recipe",
    "desc recipe",
    "https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg",
    [new Ingredient("potato",1),new Ingredient("cucumber",1)]),
    new Recipe("name recipe2",
    "desc recipe2",
    "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
    [new Ingredient("pasta",1),new Ingredient("crevette",10)])
  ];
  constructor(private shoplistService : ShoppingListService) { }

  

  getRecipe(){
    return this.recipes.slice();
  }

  addIngToShopList(ingredients : Ingredient[]){
      this.shoplistService.addIngridients(ingredients);
  }
  getRecipeById(index : number){
    return this.recipes[index];
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index : number , newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  
  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
