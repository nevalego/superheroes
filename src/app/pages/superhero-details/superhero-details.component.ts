import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroPowerTypes, Superheroe } from 'src/app/model/superheroe.model';
import { SuperheroesService } from 'src/app/services/superheroes/superheroes.service';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.scss']
})
export class SuperheroDetailsComponent {

  form!: FormGroup;

  powerTypes: any[] = Object.keys(SuperheroPowerTypes);

  superheroe!: Superheroe;

  PowerTypes = SuperheroPowerTypes;

  constructor(
    private router: Router,
    private superheroService: SuperheroesService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if(id) {
        this.superheroService.getSuperheroeById(id).subscribe(
          (result) =>  {
            if(result){
             this.superheroe = result;
             this.initializeValues();
             }
          });
      }
    });
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      origin: new FormControl(''),
      power: new FormControl(''),
      age: new FormControl(1,[Validators.min(1), Validators.max(99)])
    })
  }

  initializeValues() {
    /*this.form = new FormGroup({
      name: new FormControl(this.superheroe.name ?? ''),
      description: new FormControl(this.superheroe.description ?? ''),
      origin: new FormControl(this.superheroe.origin ?? ''),
      power: new FormControl(this.superheroe.power ?? ''),
      age: new FormControl(this.superheroe.age ?? 10)
    });*/
    this.form.get('name')?.setValue(this.superheroe.name);
    this.form.get('description')?.setValue(this.superheroe.description);
    this.form.get('origin')?.setValue(this.superheroe.origin);
    this.form.get('power')?.setValue(this.superheroe.power);
    this.form.get('age')?.setValue(this.superheroe.age);
  }
    
  backToList() {
    this.router.navigate(['/superheroes']);
  }

  updateSuperheroe() {
    if(this.form.valid) {
      const newSuperhero = {
      id: this.superheroe.id,
      name: this.form.get('name')?.value.toUpperCase() ?? '',
      description: this.form.get('description')?.value ?? '',
      origin: this.form.get('origin')?.value ?? '',
      power: this.form.get('power')?.value,
      age: this.form.get('age')?.value ?? 1,
    } as Superheroe;

    this.superheroService.updateSuperheroe(newSuperhero).subscribe(
      (result) => {
        if(result) {
          this.snackBar.open('Superhéroe actualizado');
          this.backToList();
        }else {
          this.snackBar.open('Error al actualizar el supehéroe');
        }
      }
    )
    }
  }
}
