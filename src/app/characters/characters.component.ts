import {Component, OnInit} from '@angular/core';
import {Character} from "../model/character";
import {CharactersService} from "../services/characters.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];

  //pagination start
  p = 1;

  constructor(private characterService: CharactersService, private router: Router) {
  }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe(characters => this.characters = characters)
  }

  characterDetails(char_id: number) {
    this.router.navigateByUrl("/characterDetails/" + char_id)
  }
}
