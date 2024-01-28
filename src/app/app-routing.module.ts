import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthComponent } from './health/health.component';
import { ReadyComponent } from './ready/ready.component';

const routes: Routes = [
  { path: 'health', component: HealthComponent },
  { path: 'ready', component: ReadyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
