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

/**
 * Recupera el ultimo id de los superheroes almacenados
 * @returns 
 */
  getLastIdentifier() {
    let ids: number [] = SUPERHEROES.map((superhero) => Number.parseInt(superhero.id));
    return ids.reduce((a,b) => Math.max(a,b));
  }

  /**
   * Añade un nuevo superheroe
   * @param superhero 
   * @returns 
   */
  addSuperhero(superhero: Superheroe) {
    return of(SUPERHEROES.push(superhero) > 0);
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
   * Actualiza los datos de un superheroe
   * @param newSuperheroe 
   */
  updateSuperheroe(newSuperheroe: Superheroe): Observable<boolean> {
    const superheroeInDatabse = SUPERHEROES.find(superheroe => superheroe.id === newSuperheroe.id);
    if(superheroeInDatabse) {
      superheroeInDatabse.name = newSuperheroe.name;
      superheroeInDatabse.age = newSuperheroe.age;
      superheroeInDatabse.description = newSuperheroe.description;
      superheroeInDatabse.origin = newSuperheroe.origin;
      superheroeInDatabse.power = newSuperheroe.power;
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
    description: 'El Hombre-araña',
    age: 10,
    origin: 'Marvel',
    power: 'Fuerza sobrehumana'
  },
  {
    id: '2',
    name: 'Superman',
    description: 'Superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics',
    age: 10,
    origin: 'DC',
    power: 'Volar'
  },
  {
    id: '3',
    name: 'Manolito el fuerte',
    description: 'Manolito',
    age: 10,
    origin: 'Manolito',
    power: 'Fuerza sobrehumana'
  },
  {
    id: '4',
    name: 'Wonder woman',
    description: 'Mujer Maravilla',
    age: 10,
    origin: 'DC',
    power: 'Fuerza sobrehumana'
  },
  {
    id: '5',
    name: 'Super López',
    description: 'Parodia de Superman',
    age: 10,
    origin: 'Jan',
    power: 'Volar'
  }
];