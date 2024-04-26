import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PokemonCompount } from '../../shared/models/pokemon.models';
import { CommonModule } from '@angular/common';
import { FetchpokemonService } from '../../shared/services/fetchpokemon.service';

@Component({
  selector: 'app-bigpokemoncard',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './bigpokemoncard.component.html',
  styleUrl: './bigpokemoncard.component.scss'
})

export class BigpokemoncardComponent {
  pokemonEvolutions: PokemonCompount[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemon: PokemonCompount,
    private fetchPokemonService: FetchpokemonService
  ) {
    for (let i = 0; i < this.pokemon.evolutions.length; i++) {
      let pokemonID = fetchPokemonService.getPokemonIDByName(this.pokemon.evolutions[i]);
      if (pokemonID) {
        this.fetchPokemonService.getPokemonObjectByID(pokemonID).then((pokemon) => {
          if (pokemon) this.pokemonEvolutions.push(pokemon);
        });
      }
    }
  }

  selectEvolution(evolutionIndex: number) {
    let evolution = this.pokemonEvolutions[evolutionIndex];
    if (this.pokemon === evolution) return;
    this.pokemon = evolution;
  }
}
