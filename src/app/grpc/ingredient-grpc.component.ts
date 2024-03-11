import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-grpc.component.html',
  styleUrls: ['./ingredient-grpc.component.css']
})
export class GrpcService {
  private readonly client: IngredientServiceClient;

  constructor() {
    this.client = new IngredientServiceClient('http://localhost:50051');
  }

  addIngredient(name: string, quantity: number, dateOfExpiry: string): Promise<string> {
    const request = new AddIngredientRequest();
    request.setName(name);
    request.setQuantity(quantity);
    request.setDateOfExpiry(dateOfExpiry);

    return new Promise<string>((resolve, reject) => {
      grpc.invoke(this.client.AddIngredient, {
        request,
        host: 'http://localhost:50051',
        onMessage: (message: string) => {
          resolve(message);
        },
        onEnd: (code: grpc.Code, message: string) => {
          if (code !== grpc.Code.OK) {
            reject(`Error: ${code}, message: ${message}`);
          }
        }
      });
    });
  }
}
