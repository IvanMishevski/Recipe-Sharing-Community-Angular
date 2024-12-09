import { Component } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-recipes-catalog',
  standalone: true,
  imports: [SlicePipe, RouterLink],
  templateUrl: './recipes-catalog.component.html',
  styleUrl: './recipes-catalog.component.css'
})
export class RecipesCatalogComponent {
  recipes: Recipe[] = [];
  isLoading = true;
  userId = '';

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe((user)=>{
      console.log(user._id);
      this.userId = user._id;   
    })
    this.apiService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.isLoading = false;
    });
  }
}
