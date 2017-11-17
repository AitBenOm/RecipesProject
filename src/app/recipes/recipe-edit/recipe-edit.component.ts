import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, FormGroupName, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipes: Recipe[];

  constructor(private route: ActivatedRoute, private  recipeService: RecipeService, private router: Router) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
   // console.log(this.recipeForm);
  }
  onSubmit(){
 console.log('OnSubmit '+ this.recipeForm);
   //  const recipe = new Recipe(
   //    this.recipeForm.value['name'],
   //    this.recipeForm.value['description'],
   //    this.recipeForm.value['imagePath'],
   //    this.recipeForm.value['ingredients'],
   //  );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,  this.recipeForm.value);
    }else{
      this.recipeService.addRecipe( this.recipeForm.value);
    }
    this.recipeForm.reset();
}

onCancel(){
this.router.navigate(['../'], {relativeTo: this.route});
}
  private initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode)
    {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
     // console.log('toooooooooot'+recipe.ingredients );
      if(recipe['ingredients']){

        for (let ingredient of recipe.ingredients ){

          recipeIngredients.push(
            new FormGroup(
              {
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)])
              })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients

    });
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)])
      }, Validators.required )
    );
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }
  // onAddRecipe(){
  //
  // if(!this.editMode){
  //   console.log(this.recipeForm.get('name').value);
  //    const ingredients: Ingredient[]=[
  //
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ];
  //   const recipe= new Recipe(this.recipeForm.value['name'],this.recipeForm.value['imagePath'].value,this.recipeForm.value['imagePath'],ingredients);
  //   // recipe.name=this.recipeForm.get('name').value;
  //   // recipe.imagePath=this.recipeForm.get('imagePath').value;
  //   // recipe.description=this.recipeForm.get('description').value;
  //   this.recipeService.reciepAdded.next(recipe);
  // }
  //
  // }
}
