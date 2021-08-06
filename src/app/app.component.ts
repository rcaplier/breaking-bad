import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Breaking Bad';

  isCharactersPageOn: boolean = true;
  isSearchUsed: boolean = false;

  constructor() {
  }

  activatedMethod($event: any) {
    this.isCharactersPageOn = $event.showSearch != undefined;
    console.log(this.isCharactersPageOn);
  }

  searchUsed($event: boolean) {
    this.isSearchUsed = $event;
  }
}
