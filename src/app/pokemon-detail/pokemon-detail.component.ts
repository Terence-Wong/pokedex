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

  advantageTypes: string[];
  disadvantageTypes: string[];

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
        this.advantageTypes = [];
        this.disadvantageTypes = [];
        this.pokemon.type.forEach(type => {
          this.advantageTypes = this.advantageTypes.concat(this.returnStrongAgainst(type));
          this.disadvantageTypes = this.disadvantageTypes.concat(this.returnWeakAgainst(type));
        });
        let allTypes = (this.advantageTypes.concat(this.disadvantageTypes));
        allTypes = allTypes.filter(this.unique);
        this.advantageTypes = this.advantageTypes.filter(element => allTypes.includes(element));
        this.disadvantageTypes = this.disadvantageTypes.filter(element => allTypes.includes(element));
      });
  }

  unique(value, index, self): boolean{
    for(let x = 0; x < self.length; x++){
      if(value === self[x] && x != index){
        return false;
      }
    }
    return true;
  }
  contains(){

  }


  getImageUrl(): string{
    
    let id = this.route.snapshot.paramMap.get('id');
    while(id.length < 3){
      id = '0' + id;
    }
    if(+this.route.snapshot.paramMap.get('id') == 122){ //mr mime//83 farfetched?
      //githug pages hotfix
      //return '../../assets/images/250px-122mr-mime.jpg'
      return 'assets/images/250px-122mr-mime.jpg';
    }else if(+this.route.snapshot.paramMap.get('id') == 83){
      //return '../../assets/images/250px-083Farfetchd.jpg'
      return 'assets/images/250px-083Farfetchd.jpg';
    }
    //return '../../assets/images/250px-'+id+this.pokemon.name+'.png';
    return 'assets/images/250px-'+id+this.pokemon.name+'.png';
  }
  


  //type matchups
  returnStrongAgainst(type: string): string[]{
    switch(type){
      case "Normal":
        return [];
      case "Fire":
        return ["Grass", "Ice", "Bug", "Steel"];
      case "Water":
        return ["Fire", "Ground", "Rock"];
      case "Electric":
        return ["Water", "Flying"];
      case "Grass":
        return ["Water", "Ground", "Rock"];
      case "Ice":
        return ["Grass", "Ground", "Flying", "Dragon"];
      case "Fighting":
        return ["Normal", "Ice", "Rock", "Dark", "Steel"];
      case "Poison":
        return ["Grass", "Fairy"];
      case "Ground":
        return ["Fire", "Electric", "Poison", "Rock", "Steel"];
      case "Flying":
        return ["Grass", "Fighting", "Bug"];
      case "Psychic":
        return ["Fighting", "Poison"];
      case "Bug":
        return ["Grass", "Psychic"];
      case "Rock":
        return ["Fire", "Ice", "Flying", "Bug"];
      case "Ghost":
        return ["Psychic", "Ghost"];
      case "Dragon":
        return ["Dragon"];
      case "Dark":
        return ["Psychic", "Ghost"];
      case "Steel":
        return ["Ice", "Rock", "Fairy"];
      case "Fairy":
        return ["Poison", "Dragon", "Dark"];
    }
  }
  returnWeakAgainst(type: string): string[]{
    switch(type){
      case "Normal":
        return ["Rock", "Ghost", "Steel"];
      case "Fire":
        return ["Water", "Rock", "Dragon"];
      case "Water":
        return ["Grass", "Dragon"];
      case "Electric":
        return ["Grass", "Dragon"];
      case "Grass":
        return ["Fire", "Poison", "Flying", "Bug", "Dragon", "Steel"];
      case "Ice":
        return ["Fire", "Water", "Steel"];
      case "Fighting":
        return ["Poison", "Flying", "Psychic", "Bug", "Ghost", "Fairy"];
      case "Poison":
        return ["Ground", "Rock", "Ghost"];
      case "Ground":
        return ["Grass", "Flying", "Bug"];
      case "Flying":
        return ["Electric", "Rock", "Steel"];
      case "Psychic":
        return ["Dark", "Steel"];
      case "Bug":
        return ["Fire", "Fighting", "Poison", "Flying", "Ghost", "Steel", "Fairy"];
      case "Rock":
        return ["Fighting", "Ground", "Steel"];
      case "Ghost":
        return ["Normal", "Dark"];
      case "Dragon":
        return ["Steel", "Fairy"];
      case "Dark":
        return ["Fighting", "Fairy"];
      case "Steel":
        return ["Fire", "Water", "Electric"];
      case "Fairy":
        return ["Fire", "Poison", "Steel"];
    }
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
