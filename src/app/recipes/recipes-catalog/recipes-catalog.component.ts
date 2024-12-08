import { Component } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-recipes-catalog',
  standalone: true,
  imports: [],
  templateUrl: './recipes-catalog.component.html',
  styleUrl: './recipes-catalog.component.css'
})
export class RecipesCatalogComponent {
  recipes: Recipe[] = [];
  isLoading = true;

  constructor(private apiService:ApiService){}

  ngOnInit(){
    this.apiService.getRecipes().subscribe(recipes=>{
      console.log(recipes);
      this.recipes = recipes.slice(-5);
      this.isLoading = false;
    });
  }
}
