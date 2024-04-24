import { Component, inject } from '@angular/core';
import { FetchpokemonService } from '../shared/services/fetchpokemon.service';

@Component({
  selector: 'app-pokemonlist',
  standalone: true,
  imports: [],
  templateUrl: './pokemonlist.component.html',
  styleUrl: './pokemonlist.component.scss'
})
export class PokemonlistComponent {
  pokeData = inject(FetchpokemonService);
}
