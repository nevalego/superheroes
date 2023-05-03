import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperheroPowerTypes, Superheroe } from 'src/app/model/superheroe.model';
import { SuperheroesService } from 'src/app/services/superheroes/superheroes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-superhero-page',
  templateUrl: './new-superhero-page.component.html',
  styleUrls: ['./new-superhero-page.component.scss']
})
export class NewSuperheroPageComponent implements OnDestroy{

  form!: FormGroup;

  powerTypes: any[] = Object.keys(SuperheroPowerTypes);
  PowerTypes = SuperheroPowerTypes;

  lastNumber!: number;
  lastNumberSub$: Subscription;

  constructor(
    private router: Router,
    private superheroService: SuperheroesService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      origin: new FormControl(''),
      power: new FormControl(''),
      age: new FormControl('')
    })

    this.lastNumberSub$ = this.superheroService.getLastIdentifier().subscribe(
      (result) => this.lastNumber = result
    );
  }
  ngOnDestroy(): void {
    this.lastNumberSub$.unsubscribe();
  }

  
  backToList() {
    this.router.navigate(['/superheroes']);
  }

  addSuperheroe() {
    // TODO VALIDATORS
    const newSuperhero = {
      id: (this.lastNumber + 1).toString(),
      name: this.form.get('name')?.value.toUpperCase() ?? '',
      description: this.form.get('description')?.value ?? '',
      origin: this.form.get('origin')?.value ?? '',
      power: this.form.get('power')?.value,
      age: this.form.get('age')?.value ?? 1,
    } as Superheroe;

    this.superheroService.addSuperhero(newSuperhero).subscribe(
      (result) => {
        if(result) {
          this.snackBar.open('Superhéroe añadido');
          this.backToList();
        } else {
          this.snackBar.open('Error al añadir al superhéroe');
        }
      }
    )
  }
}
