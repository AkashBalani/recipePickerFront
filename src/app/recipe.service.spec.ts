import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost/django/find_recipes'; // replace with your actual API URL

  constructor(private http: HttpClient) { }

  findRecipes(ingredients: string[], excluded: string[], calcium: string): Observable<any> {
    let params = new HttpParams();
    ingredients.forEach(ingredient => {
      params = params.append('ingredient', ingredient);
    });
    excluded.forEach(exclude => {
      params = params.append('exclude', exclude);
    });
    params = params.append('calcium', calcium);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
