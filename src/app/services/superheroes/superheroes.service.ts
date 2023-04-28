import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Superheroe } from 'src/app/model/superheroe.model';

@Injectable({
  providedIn: 'root'
})

/**
 * MOCK SERVER TO CALL HTTP WITHOUT BACK END
 * https://medium.com/geekculture/setting-up-a-mock-backend-with-angular-13-applications-26a21788f7da
 */
export class SuperheroesService {

  constructor() { }


  /**
   * Consulta todos los superhéroes
   */
  getSuperheroes(): Observable<Superheroe[]> {
    return of(SUPERHEROES);
  }

  /**
   * Consulta un único superhéroe por id
   * @param id 
   * @returns 
   */
  getSuperheroeById(id: string): Observable<Superheroe | undefined> {
    return of(SUPERHEROES.find(superheroe => superheroe.id === id));
  }

  /**
   * Consulta todos los super héroes que contienen en su nombre el valor
   * de un parámetro enviado en la petición
   * @param textField 
   * @returns 
   */
  filterSuperheroesByName(textField: string) {
    return of(SUPERHEROES.filter(superheroe => superheroe.name.includes(textField)));
  }

  /**
   * 
   * @param newSuperheroe 
   */
  updateSuperheroe(newSuperheroe: Superheroe): Observable<boolean> {
    const superheroeInDatabse = SUPERHEROES.find(superheroe => superheroe.id === newSuperheroe.id);
    if(superheroeInDatabse) {
      superheroeInDatabse.name = newSuperheroe.name;
      return of(true);
    } else {
      return of(false);
    }
  }

  /**
   * Elimina un superheroe
   * @param superheroe 
   * @returns 
   */
  deleteSuperheroe(superheroe: Superheroe): Observable<boolean> {
    const index = SUPERHEROES.indexOf(superheroe);
    if (index > -1) { // only splice array when item is found
      SUPERHEROES.splice(index, 1); // 2nd parameter means remove one item only
      return of(true);
    } else {

      return of(false);
    }

  }
}


export const SUPERHEROES: Superheroe [] = [
  {
    id: '1',
    name: 'Spiderman'
  },
  {
    id: '2',
    name: 'Superman'
  },
  {
    id: '3',
    name: 'Manolito el fuerte'
  },
  {
    id: '4',
    name: 'Wonder woman'
  },
  {
    id: '5',
    name: 'Super López'
  }
];