import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RecipesCatalogComponent } from './recipes/recipes-catalog/recipes-catalog.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { AuthGuard } from './guards/auth.guard';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { CurrentRecipeComponent } from './recipes/current-recipe/current-recipe.component';
import { GuestGuard } from './guards/guest.guard';



export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    //user routing
    {path:'login',component:LoginComponent,canActivate: [GuestGuard]},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'logout',component:ProfileComponent,canActivate: [GuestGuard]},
    //start recipes routing
     {path:'recipes', children:[
     {path: '', component:RecipesCatalogComponent},
     {path: ':recipeId',component:CurrentRecipeComponent}    
     ]},
     {path:'add-recipe',component:AddRecipeComponent, canActivate:[AuthGuard]},
    // //end recipe routing
    {path: 'error', component: ErrorMsgComponent },
    {path:'404', component:ErrorComponent},
    {path:'**', component:ErrorComponent}


];
