import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Character} from "../model/character";
import {CharactersService} from "../services/characters.service";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character?: Character;

  constructor(private activatedRoute: ActivatedRoute, private characterService: CharactersService) { }

  getCharacter(): void{
    let char_id: number = -1;
    let param: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    if (param != null){
      char_id = +param;
    }
    this.characterService.getCharacterById(char_id).subscribe(character => this.character = character[0]);
  }

  ngOnInit(): void {
    this.getCharacter();
  }

}
