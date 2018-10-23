import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  pokemonData: Pokemon[];
 
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemon();
  }
  
  getPokemon(): void {
    this.pokemonService.getPokemonData()
      .subscribe(data => this.pokemonData = data);
  }
}
