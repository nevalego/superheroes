import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuperheroPowerTypes, Superheroe } from 'src/app/model/superheroe.model';

@Injectable({
  providedIn: 'root'
})

/**
 * MOCK SERVER TO CALL HTTP WITHOUT BACK END
 * https://medium.com/geekculture/setting-up-a-mock-backend-with-angular-13-applications-26a21788f7da
 */
export class SuperheroesService {

  constructor() { }

  getLastIdentifier() {
    let ids: number [] = SUPERHEROES.map((superhero) => Number.parseInt(superhero.id));
    return ids.reduce((a,b) => Math.max(a,b));
  }

  addSuperhero(superhero: Superheroe) {
    // TODO CHEK ID not EXISTING ALREADY
    
    SUPERHEROES.push(superhero);
  }

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
    return of(SUPERHEROES.filter(superheroe => 
      superheroe.name.toLocaleLowerCase().includes(textField.toLocaleLowerCase())));
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
    name: 'Spiderman',
    description: 'Hombre-araña',
    age: 10,
    origin: '',
    power: 'Volar'
  },
  {
    id: '2',
    name: 'Superman',
    description: '',
    age: 10,
    origin: '',
    power: 'Volar'
  },
  {
    id: '3',
    name: 'Manolito el fuerte',
    description: '',
    age: 10,
    origin: '',
    power: 'Volar'
  },
  {
    id: '4',
    name: 'Wonder woman',
    description: '',
    age: 10,
    origin: '',
    power: 'Volar'
  },
  {
    id: '5',
    name: 'Super López',
    description: '',
    age: 10,
    origin: '',
    power: 'Volar'
  }
];