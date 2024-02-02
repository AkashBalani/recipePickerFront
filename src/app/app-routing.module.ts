import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthComponent } from './health/health.component';
import { ReadyComponent } from './ready/ready.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { FindRecipesComponent } from './find-recipes/find-recipes.component';

const routes: Routes = [
  { path: 'health', component: HealthComponent },
  { path: 'ready', component: ReadyComponent },
  { path: 'ingredient-form', component: IngredientFormComponent },
  { path: 'find-recipes', component: FindRecipesComponent },
  { path: '', redirectTo: '/ingredient-form', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
