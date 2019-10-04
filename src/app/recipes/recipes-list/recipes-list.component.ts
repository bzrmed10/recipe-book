import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit ,OnDestroy {

  
  recipes :Recipe[] ;
  subsctiption : Subscription;

  constructor(private recipeService : RecipeService, private route : ActivatedRoute, private router :Router) { }

  ngOnInit() {
    this.subsctiption = this.recipeService.recipeChanged.subscribe(
      (recipes : Recipe[] ) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo : this.route});
  }
  ngOnDestroy(){
    this.subsctiption.unsubscribe();
    
  }
}
