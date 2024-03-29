import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';


@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor( private dataStrorageService : DataStorageService ,private recipeService : RecipeService) { }
  resolve(route :ActivatedRouteSnapshot , state : RouterStateSnapshot){
      const recipes = this.recipeService.getRecipe();
      if(recipes.length === 0){
        return this.dataStrorageService.fetchData();
      }else{
        return recipes;
      }
      
  }

}
