import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient,private recipeService : RecipeService ) { }

  saveData(){
    const recipes = this.recipeService.getRecipe();
    return this.http.put('https://recipe-book-ece39.firebaseio.com/recipes.json',recipes)
    .subscribe(
      res =>{ console.log(res);
    });

  }

  fetchData(){
    return this.http.get<Recipe[]>('https://recipe-book-ece39.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients : recipe.ingredients ? recipe.ingredients : []
          };
          
        });
    }),tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    );
  }

}
