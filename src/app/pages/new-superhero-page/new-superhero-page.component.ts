import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-superhero-page',
  templateUrl: './new-superhero-page.component.html',
  styleUrls: ['./new-superhero-page.component.scss']
})
export class NewSuperheroPageComponent {

  formControl!: FormControl;

  constructor() {}

  

}
