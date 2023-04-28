import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuperheroPageComponent } from './new-superhero-page.component';

describe('NewSuperheroPageComponent', () => {
  let component: NewSuperheroPageComponent;
  let fixture: ComponentFixture<NewSuperheroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuperheroPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSuperheroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
