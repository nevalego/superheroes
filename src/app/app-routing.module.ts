import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesPageComponent } from './pages/superheroes-page/superheroes-page.component';

const routes: Routes = [
  {path: 'superheroes', component: SuperheroesPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
