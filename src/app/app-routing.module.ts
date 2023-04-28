import { NewSuperheroPageComponent } from './pages/new-superhero-page/new-superhero-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesPageComponent } from './pages/superheroes-page/superheroes-page.component';
import { SuperheroDetailsComponent } from './pages/superhero-details/superhero-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'superheroes', pathMatch: 'full'},
  {path: 'superheroes', component: SuperheroesPageComponent},
  {path: 'superheroes/details/:id', component: SuperheroDetailsComponent},
  {path: 'superheroes/new-superhero', component: NewSuperheroPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
