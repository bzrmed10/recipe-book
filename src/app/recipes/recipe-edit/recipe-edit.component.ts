import { RecipeService } from '../recipe.service';
import { FormControl, FormArray ,Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number ;
  edidMode = false;
  recipeForm : FormGroup;
 
  constructor( private route : ActivatedRoute, private recipeService : RecipeService , private router : Router) { }

  ngOnInit() {



    this.route.params.subscribe(
      (params :Params) => {
        this.id = +params['id'];
        this.edidMode = params['id'] != null;
        this.initForm();
        
      }
    );

  }

  onSubmit(){
    // console.log(this.recipeForm.value);
    if(this.edidMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
     this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'] , {relativeTo : this.route});
}

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null , Validators.required ),
        'amount' : new FormControl(null ,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/ )])
      })
    );
    
  }
  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  
  private initForm(){ 
    let recipeName ='';
    let recipeImagePath ='';
    let recipeDescription ='';
    let recipeIngrediants = new FormArray([]);

    if(this.edidMode){
       const recipe = this.recipeService.getRecipeById(this.id);
       recipeName = recipe.name;
       recipeImagePath = recipe.imagePath;
       recipeDescription = recipe.description;
       if(recipe['ingredients']){
         for(let ingr of recipe.ingredients){
           recipeIngrediants.push(
             new FormGroup({
               'name' : new FormControl(ingr.name, Validators.required),
               'amount' : new FormControl(ingr.amount,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/ )] )
             })
           );
         }
       }
    }

    this.recipeForm = new FormGroup ({
      'name' : new FormControl(recipeName , Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngrediants
    });
  }
}
