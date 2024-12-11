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
    recipeName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
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
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const id = this.route.snapshot.params['recipeId'];
    const {recipeName, image, description } = this.form.value;

    this.apiService.editRecipe( id, recipeName!, image!, description!,'edit').subscribe(() => {
      this.router.navigate([`/recipes/${ id}`]);
    })
  }
  isFieldTextMissing(controlName: string) {
    return this.form.get(controlName)?.touched &&
        this.form.get(controlName)?.errors?.['required']
}
}