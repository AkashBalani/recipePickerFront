import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent {
  name: string = '';
  quantity: number = 0;
  date_of_expiry: string = '';
  // response: any;

  constructor(private http: HttpClient) { }

  onSubmit() {
    // Call a service to send data to Django backend
    const formData = {
      name: this.name,
      quantity: this.quantity,
      date_of_expiry: this.date_of_expiry
    };
    // Add code here to send the form data to Django backend
    console.log('Form submitted:', formData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

  this.http.post('http://localhost:8000/django/api/ingredients/', formData, { headers })
    .subscribe(response => {
      console.log('Django API response:', response);
    }, error => {
      console.error('Error:', error);
      if (error.name === 'HttpErrorResponse') {
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error:', error.error);
      }
    });
  }
}
