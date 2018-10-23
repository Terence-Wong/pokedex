import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PokemonService } from '../pokemon.service';

import { Pokemon } from '../pokemon';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService,
    private router: Router
  ) { 
    router.events.subscribe((val) => {
      this.getPokemon();
      //lol spent 3 days figuring out that component doesnt update
      //if you route to the same component
    });
  }

  ngOnInit() {
    this.getPokemon();
    
  }
  getPokemon(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

}
