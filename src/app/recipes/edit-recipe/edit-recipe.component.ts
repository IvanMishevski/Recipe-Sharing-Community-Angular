import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../types/recipe';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {

  recipe = {} as Recipe;
  form = new FormGroup({
    recipeName: new FormControl('', [Validators.required,Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required,Validators.minLength(10)])
  });

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const recipeId = this.route.snapshot.params['recipeId'];
    this.apiService.getSingleRecipe(recipeId).subscribe((recipe) => {
      this.recipe = recipe;
      this.form.setValue({
        recipeName: recipe.recipeName,
        description: recipe.description,
        image: recipe.image
      });
    })
  }
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    
    const id = this.route.snapshot.params['recipeId'];
    const { recipeName, description, image } = this.form.value;

    this.apiService.editRecipe(id, recipeName!, description!, image!).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
  isFieldTextMissing(controlName: string) {
    return this.form.get(controlName)?.touched &&
        this.form.get(controlName)?.errors?.['required']
}
}