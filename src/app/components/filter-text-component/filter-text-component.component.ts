import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-filter-text-component',
  templateUrl: './filter-text-component.component.html',
  styleUrls: ['./filter-text-component.component.scss']
})
export class FilterTextComponentComponent {

  form!: FormGroup;

  @Output() textFilterChange = new EventEmitter<string>();
  @Output() clearTextFilter = new EventEmitter();

  constructor() {
    this.form = new FormGroup({
        textFilter:  new FormControl(''),
    })
    this.form.get('textFilter')?.valueChanges.subscribe((value: string | undefined) => {
      this.textFilterChange.emit(value ?? '');
    });
  }
  
  clearSearch() {
    this.form.get('textFilter')?.setValue('');
    this.clearTextFilter.emit();
  }
}
