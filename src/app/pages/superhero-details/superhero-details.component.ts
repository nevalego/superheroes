import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroPowerTypes, Superheroe } from 'src/app/model/superheroe.model';
import { SuperheroesService } from 'src/app/services/superheroes/superheroes.service';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.scss']
})
export class SuperheroDetailsComponent implements OnInit{

  form!: FormGroup;

  powerTypes: any[] = Object.keys(SuperheroPowerTypes);

  superheroe!: Superheroe;

  constructor(
    private router: Router,
    private superheroService: SuperheroesService,
    private activatedRoute: ActivatedRoute
  ) {

    // TODO GET BY ID FROM ROUTE AND SAVE IN CONTROL VALUES

    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      origin: new FormControl(''),
      power: new FormControl(''),
      age: new FormControl('')
    })
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = params.get('id');
      if(id) {
        this.superheroService.getSuperheroeById(id).subscribe(
          (result) =>  {
            if(result){
             this.superheroe = result;
              this.setValuesToForm();
             }
          });
      }
    });
  }

  setValuesToForm() {
    if(this.superheroe) {
      this.form.get('name')?.setValue(this.superheroe.name);
      this.form.get('description')?.setValue(this.superheroe.description);
      this.form.get('origin')?.setValue(this.superheroe.origin);
      this.form.get('power')?.setValue(this.superheroe.power);
      this.form.get('age')?.setValue(this.superheroe.age);
    }
  }
    
  backToList() {
    this.router.navigate(['/superheroes']);
  }

  updateSuperheroe() {
    // TODO VALIDATORS
    const newSuperhero = {
      id: this.superheroe.id,
      name: this.form.get('name')?.value ?? '',
      description: this.form.get('description')?.value ?? '',
      origin: this.form.get('origin')?.value ?? '',
      power: this.form.get('power')?.value,
      age: this.form.get('age')?.value ?? 1,
    } as Superheroe;

    this.superheroService.updateSuperheroe(newSuperhero);
    // SUBSCRIBE TO SUCCES AND SNACKBAR
    this.backToList();
  }
}
