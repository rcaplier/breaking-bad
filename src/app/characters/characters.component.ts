import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Character} from "../model/character";
import {CharactersService} from "../services/characters.service";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnChanges {

  characters: Character[] = [];

  showSearch: boolean = true;
  isSearchControlUsed: boolean = false;


  //pagination start
  p = 1;

  constructor(private characterService: CharactersService, private router: Router) {

  }

  ngOnInit() {
    this.characterService.searched$.subscribe(res => {
      this.isSearchControlUsed = res;
      this.getCharactersFiltred();
    });


    if (!this.isSearchControlUsed){
      this.getCharacters();
      console.log("this.getCharacters()");
      }else {
      this.getCharactersFiltred();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }


  getCharactersFiltred(){
    this.characterService.getCharactersFiltred().subscribe(characters => {
      this.characters = characters;
    });
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe(characters => this.characters = characters);
  }

  characterDetails(char_id: number) {
    this.router.navigateByUrl("/characterDetails/" + char_id);
  }
}
