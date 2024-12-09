import { Component } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { SlicePipe } from '../../shared/pipes/slice.pipe';

@Component({
  selector: 'app-recipes-catalog',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './recipes-catalog.component.html',
  styleUrl: './recipes-catalog.component.css'
})
export class RecipesCatalogComponent {
  recipes: Recipe[] = [];
  isLoading = true;

  constructor(private apiService:ApiService){}

  ngOnInit(){
    this.apiService.getRecipes().subscribe(recipes=>{
      this.recipes = recipes;
      this.isLoading = false;
    });
  }
}
