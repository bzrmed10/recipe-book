import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
  id :number;
  constructor(private recipeService : RecipeService ,private route : ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param : Params) => {
        this.id = +param['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
    
  }

  addToShopping(){
    this.recipeService.addIngToShopList(this.recipe.ingredients);
  }

  onEditeRecipe(){
      this.router.navigate(['edit'],{relativeTo : this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  
}
