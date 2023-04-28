import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTextComponentComponent } from './filter-text-component.component';

describe('FilterTextComponentComponent', () => {
  let component: FilterTextComponentComponent;
  let fixture: ComponentFixture<FilterTextComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTextComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTextComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
