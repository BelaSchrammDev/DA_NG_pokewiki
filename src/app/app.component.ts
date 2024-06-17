import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonlistComponent } from './pokemonlist/pokemonlist.component';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, PokemonlistComponent, HeaderComponent]
})
export class AppComponent {
  title = 'pokewiki';
}
