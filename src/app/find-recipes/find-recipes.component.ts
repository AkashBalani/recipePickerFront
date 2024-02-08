import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'find-recipes',
  templateUrl: './find-recipes.component.html',
  styleUrls: ['./find-recipes.component.css']
})
export class FindRecipesComponent {
  ingredient: string = '';
  excluded: string = '';
  calcium: string = '';

  constructor(private http: HttpClient) { }

  // addIngredient(ingredient: string) {
  //   if (ingredient) {
  //     this.ingredients.push(ingredient);
  //   }
  // }

  // getCookie(csrftoken: string) {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== '') {
  //     const cookies = document.cookie.split(';');
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       // Does this cookie string begin with the name we want?
  //       if (cookie.substring(0, csrftoken.length + 1) === (csrftoken + '=')) {
  //         cookieValue = decodeURIComponent(cookie.substring(csrftoken.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // }

  onSubmit() {
    // Call a service to send data to Django backend
    let params = new HttpParams();
    // this.ingredients.forEach(ingredient => {
    //   params = params.append('ingredient', ingredient);
    // });
    if (this.ingredient) {
      params = params.append('ingredient', this.ingredient);
    }
    if (this.excluded) {
      params = params.append('excluded', this.excluded);
    }
    if (this.calcium) {
      params = params.append('calcium', this.calcium);
    }
    // Add code here to send the form data to Django backend
        

      this.http.get('http://localhost:8000/django/api/find_recipes/', { params })
        .subscribe(response => {
          console.log('Django API response:', response);
        }, error => {
          console.error('Error:', error);
        });
  }
}