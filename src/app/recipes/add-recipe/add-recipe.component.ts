import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  constructor(private apiService: ApiService,private router:Router) { }

  addRecipe(form: NgForm) {

    if (form.invalid) {
      return;
    }
    const { recipeName, image, description } = form.value;

    return this.apiService.createRecipe( recipeName, image, description ).subscribe((data) => {
      console.log(data);
       
      this.router.navigate(['home'])

    })
  }
}
