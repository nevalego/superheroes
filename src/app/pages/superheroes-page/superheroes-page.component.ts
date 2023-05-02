import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { Superheroe } from 'src/app/model/superheroe.model';
import { SuperheroesService } from 'src/app/services/superheroes/superheroes.service';

@Component({
  selector: 'app-superheroes-page',
  templateUrl: './superheroes-page.component.html',
  styleUrls: ['./superheroes-page.component.scss']
})
export class SuperheroesPageComponent implements OnInit, OnDestroy{
  
  superheroes: Superheroe [];
  getSuperherosSub!: Subscription;
  superheroesToShow: Superheroe[];

  constructor(
    private superheroesService: SuperheroesService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.superheroes = [];
    this.superheroesToShow = [];
  }
  
  ngOnInit(): void {
    this.getSuperheroes();
  }
  ngOnDestroy(): void {
    this.getSuperherosSub.unsubscribe();
  }

  textFilteringList(textName: string) {
       this.superheroesService.filterSuperheroesByName(textName).subscribe(
      (result) => {
        if(result) {
          this.superheroesToShow = result;
        }
      }
    )
    
  }

  clearTextFilter() {
    this.superheroesToShow = this.superheroes.slice(
          0, 10
        );
  }

  addSuperhero() {
    this.router.navigate(['superheroes/new-superhero']);
  }

  deleteSuperhero(superhero: Superheroe) {

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '30%',
      data: {
        icon: 'warning',
        title: 'Confirmación de borrado',
        body: '¿Está seguro de que desea borrar al superhéroe ' + superhero.name + '?',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((accept: any) => {
        if (accept) {
          this.superheroesService.deleteSuperheroe(superhero).subscribe(
            (success) => {
              if(success) {
                this.getSuperheroes();
                this.snackbar.open('Superhéroe eliminado con éxito');
              }else {
                this.snackbar.open('El superhéroe no pudo ser eliminado');
              }
            }
          )
        }
      }); 
  }

  seeSuperheroDetails(superhero: Superheroe){
    this.router.navigate(['superheroes/details/' + superhero.id]);
  }

  getSuperheroes() {
    this.getSuperherosSub = this.superheroesService.getSuperheroes().subscribe(
      superheroes => {
        this.superheroes = superheroes;
        this.superheroesToShow = this.superheroes.slice(
          0, 10
        )
      }
    );
  }

  
  paginate(paginacion: any) {
    let actual = paginacion.pageIndex * paginacion.pageSize
    this.superheroesToShow = this.superheroes.slice(
      actual,
      actual + paginacion.pageSize
    );
  }
}
