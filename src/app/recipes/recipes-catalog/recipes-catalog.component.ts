import { Component } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-recipes-catalog',
  standalone: true,
  imports: [SlicePipe, RouterLink, LoaderComponent],
  templateUrl: './recipes-catalog.component.html',
  styleUrl: './recipes-catalog.component.css'
})
export class RecipesCatalogComponent {
  recipes: Recipe[] = [];
  isLoading = true;
  
  public get userId() : string | undefined {
    return this.userService.user?._id;
  }
  
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  get hasRecipes(): boolean {
    return this.recipes.length > 0;
  }

  constructor(private apiService: ApiService, private userService: UserService, private router:Router) { }

  ngOnInit() {
    
    console.log(this.userId);
    
    if(this.isLoggedIn){
      this.userService.getProfile().subscribe((user)=>{ 
      })
    } 
    this.apiService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.isLoading = false;
    });
  }
  onDelete(recipeId:string){
    return this.apiService.deleteRecipe(recipeId).subscribe({
      next: () => {
        // Reload the current route
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/recipes']);
        });
      }
    });
  }
}
