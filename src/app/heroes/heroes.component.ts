import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero | null = null;
  heroes : Hero[] | null = null;
  
  constructor(private heroService: HeroService,private message:MessageService) {}

  ngOnInit(): void {
    //this.getHeroes();
  }

  getHeroes(): void {
   // this.heroes = this.heroService.getHeroes();
   this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.message.add(`Se acaba de seleccionar el Heroe ${hero.id}`)

  }
}
