import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { 
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  //pokemonData: Pokemon[];
  pokemonData$: Observable<Pokemon[]>;
  searchData$: Observable<Pokemon[]>;
  private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    //this.getPokemon();

    //this.searchTerms.next('');
    this.pokemonData$ = this.pokemonService.getPokemonData();

    this.searchData$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => 
        this.pokemonService.searchPokemon(term)
      ),
    );
    this.searchData$.subscribe(()=>{
      this.pokemonData$ = this.searchData$;
    });
  }
  initValue(): void{

  }
  search(term: string): void{
    //console.log(term);
    this.searchTerms.next(term);

  }

  /*
  getPokemon(): void {
    this.pokemonService.getPokemonData()
      .subscribe(data => this.pokemonData = data);
  }
  */
}
