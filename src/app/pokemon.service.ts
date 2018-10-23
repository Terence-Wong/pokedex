import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from './pokemon';
import { POKEMON } from './pokemonData';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }
  getPokemonData(): Observable<Pokemon[]> {
    return of(POKEMON);
  }
  getPokemon(id: number): Observable<Pokemon> {
    return of(POKEMON.find(pokemon => pokemon.id === id));
  }
}
