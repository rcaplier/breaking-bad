import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CharactersComponent} from "./characters/characters.component";
import {CharacterDetailsComponent} from "./character-details/character-details.component";
import {NavigationComponent} from "./navigation/navigation.component";

const routes: Routes = [
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  {path: 'characters', component: CharactersComponent},
  {path: 'characterDetails/:id', component: CharacterDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
