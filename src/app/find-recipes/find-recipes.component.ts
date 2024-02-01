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
      'Content-Type': 'application/json'
    });

  this.http.post('http://localhost/django/apiv2/find-recipes/', formData, { headers })
    .subscribe(response => {
      console.log('Django API response:', response);
    }, error => {
      console.error('Error:', error);
    });
  }
}