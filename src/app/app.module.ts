import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HealthComponent } from './health/health.component';
import { ReadyComponent } from './ready/ready.component';
import { FindRecipesComponent } from './find-recipes/find-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientFormComponent,
    HealthComponent,
    ReadyComponent,
    FindRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
