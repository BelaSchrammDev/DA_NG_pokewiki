import { Component, inject } from '@angular/core';
import { FetchpokemonService } from '../shared/services/fetchpokemon.service';
import { CommonModule } from '@angular/common';
import { SinglepokemoncardComponent } from './singlepokemoncard/singlepokemoncard.component';

@Component({
  selector: 'app-pokemonlist',
  standalone: true,
  imports: [CommonModule, SinglepokemoncardComponent],
  templateUrl: './pokemonlist.component.html',
  styleUrl: './pokemonlist.component.scss'
})
export class PokemonlistComponent {
  pokeData = inject(FetchpokemonService);
}
