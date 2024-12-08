import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPosts(limit?: number) {
    let url = `/api/comments`;
    if (limit) {
      url += `?limit=${limit}`
    }
    return this.http.get<Comment[]>(url)
  }
  getThemes() {
    return this.http.get<Recipe[]>(`/api/recipes`)
  }
  getSingleTheme(id: string) {
    return this.http.get<Recipe>(`/api/recipes/${id}`)
  }
  createTheme(themeName: string,postText: string){
    const payload = {themeName, postText}
    return this.http.post<Recipe>(`/api/recipes`,payload);
  }
}
