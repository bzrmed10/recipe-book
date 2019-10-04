import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { trigger } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy {
  
  // @ViewChild('nameInput', {static: true}) nameInputRef : ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInputRef : ElementRef;
  @ViewChild('f' , {static : false}) slForm : NgForm;
  subscription :Subscription;
  
  editMode = false;
  editItemIndex:number;
  editedItem : Ingredient;

  constructor(private shoppingListService : ShoppingListService) { }
  
  ngOnInit() {
      this.subscription = this.shoppingListService.startedEditing.
        subscribe(
          (index : number) =>{
              this.editItemIndex = index;
              this.editMode = true;
              this.editedItem = this.shoppingListService.getIngredientByIndex(index);
              this.slForm.setValue({
                name : this.editedItem.name,
                amount : this.editedItem.amount
              })
          }
        )
  }
  // addIngredient(){
  //   const name = this.nameInputRef.nativeElement.value;
  //   const amount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(name,amount);
  //   this.shoppingListService.addNewIgr(newIngredient);
    
  // }

  onSubmit(form : NgForm){
  const newIngredient = new Ingredient(form.value.name,form.value.amount);
  if(this.editMode){
    this.shoppingListService.updateIngredient(this.editItemIndex,newIngredient);
  } else{
    this.shoppingListService.addNewIgr(newIngredient);
  }
  this.editMode =false;
  form.reset();
}

  onClear(form :NgForm){
    form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slForm.reset();
    this.shoppingListService.deleteIngrediant(this.editItemIndex);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
