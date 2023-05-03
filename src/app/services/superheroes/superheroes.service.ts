import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { SuperheroPowerTypes, Superheroe } from 'src/app/model/superheroe.model';

@Injectable({
  providedIn: 'root'
})

/**
 * MOCK SERVER TO CALL HTTP WITHOUT BACK END
 * 
 * Y EL INTERCEPTOR DE LOADING
 *  */
export class SuperheroesService {

  url = 'http://localhost:3000/superheroes';

  constructor(private http: HttpClient) { }

/**
 * Recupera el ultimo id de los superheroes almacenados
 * @returns 
 */
  getLastIdentifier() {
    return this.getSuperheroes().pipe(
      map((response: any) => {
        let ids =  response.map((superhero: Superheroe) => Number.parseInt(superhero.id));
        let last =  ids.reduce((a: any,b: any) => Math.max(a,b));
        console.log(last);
        return last;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    )

    /*
    let ids: number [] = SUPERHEROES.map((superhero) => Number.parseInt(superhero.id));
    return ids.reduce((a,b) => Math.max(a,b));*/
  }

  /**
   * Añade un nuevo superheroe
   * @param superhero 
   * @returns 
   */
  addSuperhero(superhero: Superheroe) {
    return this.http.post(this.url, superhero).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    );
    
    //return of(SUPERHEROES.push(superhero) > 0);
  }

  /**
   * Consulta todos los superhéroes
   */
  getSuperheroes(): Observable<Superheroe[]> {
    return this.http.get(this.url).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    );
 }

  /**
   * Consulta un único superhéroe por id
   * @param id 
   * @returns 
   */
  getSuperheroeById(id: string): Observable<Superheroe | undefined> {
    return this.getSuperheroes().pipe(
      map((response: any) => {
        let data =  response.find((superheroe: Superheroe) => superheroe.id === id);
        console.log(data);
        return data;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    )
    //return of(SUPERHEROES.find(superheroe => superheroe.id === id));
  }

  /**
   * Consulta todos los super héroes que contienen en su nombre el valor
   * de un parámetro enviado en la petición
   * @param textField 
   * @returns 
   */
  filterSuperheroesByName(textField: string) {
    
    return this.getSuperheroes().pipe(
      map((response: any) => {
        let data =  response.filter((superheroe: Superheroe) => 
        superheroe.name.toLocaleLowerCase().includes(textField.toLocaleLowerCase()));
        console.log(data);
        return data;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    )
    /*return of(SUPERHEROES.filter(superheroe => 
      superheroe.name.toLocaleLowerCase().includes(textField.toLocaleLowerCase())));*/
  }

  /**
   * Actualiza los datos de un superheroe
   * @param newSuperheroe 
   */
  updateSuperheroe(newSuperheroe: Superheroe): Observable<boolean> {
    return this.http.put(this.url + '/' + newSuperheroe.id , newSuperheroe).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    );

    /*const superheroeInDatabse = SUPERHEROES.find(superheroe => superheroe.id === newSuperheroe.id);
    if(superheroeInDatabse) {
      superheroeInDatabse.name = newSuperheroe.name;
      superheroeInDatabse.age = newSuperheroe.age;
      superheroeInDatabse.description = newSuperheroe.description;
      superheroeInDatabse.origin = newSuperheroe.origin;
      superheroeInDatabse.power = newSuperheroe.power;
      return of(true);
    } else {
      return of(false);
    }*/
  }

  /**
   * Elimina un superheroe
   * @param superheroe 
   * @returns 
   */
  deleteSuperheroe(superheroe: Superheroe): Observable<boolean> {
    return this.http.delete(this.url + '/' + superheroe.id).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((error: any, result: any) => {
        console.log(error);
        return of(result);
      })
    );

    /*const index = SUPERHEROES.indexOf(superheroe);
    if (index > -1) { // only splice array when item is found
      SUPERHEROES.splice(index, 1); // 2nd parameter means remove one item only
      return of(true);
    } else {
      return of(false);
    }*/

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