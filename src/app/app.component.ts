import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonlistComponent } from './pokemonlist/pokemonlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokewiki';
}
