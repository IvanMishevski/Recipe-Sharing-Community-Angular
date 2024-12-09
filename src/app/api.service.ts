import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getComments(limit?: number) {
    let url = `/api/comments`;
    if (limit) {
      url += `?limit=${limit}`
    }
    return this.http.get<Comment[]>(url)
  }
  getRecipes() {
    return this.http.get<Recipe[]>(`/api/recipes`)
  }
  getSingleRecipe(id: string) {
    return this.http.get<Recipe>(`/api/recipes/${id}`)
  }
  createRecipe(recipeName: string,image:string,description: string){
    const payload = {recipeName,description,image}
    return this.http.post<Recipe>(`/api/recipes`,payload);
  }
}
