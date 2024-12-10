import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../types/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HomeComponent } from '../../home/home.component';

import { DatePipe } from '@angular/common';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';

@Component({
  selector: 'app-current-recipe',
  standalone: true,
  imports: [FormsModule, HomeComponent, DatePipe,ElapsedTimePipe],
  templateUrl: './current-recipe.component.html',
  styleUrl: './current-recipe.component.css'
})
export class CurrentRecipeComponent implements OnInit {
  recipe = {} as Recipe;
  isSubscribed = false;
  

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];
    

    this.apiService.getSingleRecipe(id).subscribe((recipe) => {
      this.recipe = recipe;
      if(this.isLoggedIn){
        const userId = this.userService.user!._id
        this.isSubscribed = this.recipe.subscribers.includes(userId);
      }
      
    });
    
  }
  onSubscribe(){
    const id = this.route.snapshot.params['recipeId'];
    this.apiService.subscribe(id).subscribe((data)=>{
      this.isSubscribed = true;
      window.location.reload();
    })
  }
  onComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const id = this.route.snapshot.params['recipeId'];
    const { text } = form.value;

    this.apiService.createComment(text, id).subscribe(() => {
      window.location.reload();
    });

  }
}
