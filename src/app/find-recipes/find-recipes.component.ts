import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'find-recipes',
  templateUrl: './find-recipes.component.html',
  styleUrls: ['./find-recipes.component.css']
})
export class FindRecipesComponent {
  ingredients: string = '';
  excluded: string = '';
  calcium: string = '';

  constructor(private http: HttpClient) { }

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
    const formData = {
      ingredients: this.ingredients,
      excluded: this.excluded,
      calcium: this.calcium,
    };
    // Add code here to send the form data to Django backend
        console.log('Form submitted:', formData);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          // 'X-CSRFToken': this.getCookie('csrftoken') ?? ''
        });

      this.http.get('http://localhost:8000/django/api/find_recipes/', { headers })
        .subscribe(response => {
          console.log('Django API response:', response);
        }, error => {
          console.error('Error:', error);
        });
  }
}