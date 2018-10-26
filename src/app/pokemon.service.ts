import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from './pokemon';
//import { POKEMON } from './pokemonData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private dataUrl = 'api/pokemonList';
  constructor(
    private http: HttpClient
  ) { }
  getPokemonData(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.dataUrl)
      .pipe(
        tap(pokemonList => this.log('fetched pokemon list')),
        catchError(this.handleError('getPokemonData',[]))
      );
  }
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.dataUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
    //return of(POKEMON.find(pokemon => pokemon.id === id));
  }
  searchPokemon(term: string): Observable<Pokemon[]> {
    if(!term){
      return this.getPokemonData();
    }
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.dataUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found pokemon matching "${term}"`)),
        catchError(this.handleError<Pokemon[]>('searchPokemon', []))
      );
  }

  private log(message: string){
    //console.log(`PokmonService: ${message}`);
  }
  private handleError<T> (operation = 'operation',result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
