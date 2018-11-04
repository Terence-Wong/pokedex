import { Component, OnInit } from '@angular/core';
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
  pokemon: Pokemon;
  imageUrl: string;

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
      .subscribe(pokemon =>{ 
        this.pokemon = pokemon;
        this.imageUrl = this.getImageUrl();
      });
  }
  getImageUrl(): string{
    
    let id = this.route.snapshot.paramMap.get('id');
    while(id.length < 3){
      id = '0' + id;
    }
    if(+this.route.snapshot.paramMap.get('id') == 122){ //mr mime//83 farfetched?
      return '../../assets/images/250px-122mr-mime.jpg'
    }else if(+this.route.snapshot.paramMap.get('id') == 83){
      return '../../assets/images/250px-083Farfetchd.jpg'
    }
    return '../../assets/images/250px-'+id+this.pokemon.name+'.png';
  }
  


  //types
  isFire(type: string): boolean{
    return type === "Fire";
  }
  isNormal(type: string): boolean{
    return type === "Normal";
  }
  isWater(type: string): boolean{
    return type === "Water";
  }
  isElectric(type: string): boolean{
    return type === "Electric";
  }
  isGrass(type: string): boolean{
    return type === "Grass";
  }
  isIce(type: string): boolean{
    return type === "Ice";
  }
  isFighting(type: string): boolean{
    return type === "Fighting";
  }
  isPoison(type: string): boolean{
    return type === "Poison";
  }
  isGround(type: string): boolean{
    return type === "Ground";
  }
  isFlying(type: string): boolean{
    return type === "Flying";
  }
  isPsychic(type: string): boolean{
    return type === "Psychic";
  }
  isBug(type: string): boolean{
    return type === "Bug";
  }
  isRock(type: string): boolean{
    return type === "Rock";
  }
  isGhost(type: string): boolean{
    return type === "Ghost";
  }
  isDragon(type: string): boolean{
    return type === "Dragon"
  }
  isDark(type: string): boolean{
    return type === "Dark"
  }
  isSteel(type: string): boolean{
    return type === "Steel"
  }
}
