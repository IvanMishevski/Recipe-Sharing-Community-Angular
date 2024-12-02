import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RecipesCatalogComponent } from './recipes-catalog/recipes-catalog.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    //user routing
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:ProfileComponent},
    // {path:'logout',component:ProfileComponent},
    //start recipes routing
     {path:'recipes', children:[
     {path: '', component:RecipesCatalogComponent},
     //{path: ':recipeId',component:CurrentRecipeComponent}    
     ]},
    // {path:'add-theme',component:AddRecipeComponent},
    // //end recipe routing
    {path:'404*', component:ErrorComponent},
    {path:'**', component:ErrorComponent}


];
