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

  basicStatsTypes = [
    { name: 'Type Slot 1', property: 'type1' },
    { name: 'Type Slot 2', property: 'type2' },
    { name: 'Height', property: 'height' },
    { name: 'Weight', property: 'weight' },
    { name: 'Base Happiness', property: 'base_happiness' },
    { name: 'Capture Rate', property: 'capture_rate' },
    { name: 'Hatch Counter', property: 'hatch_counter' },
  ]

  statsTypes = {
    stat1: {
      name: 'HP',
      property: 'hp',
    },
    stat2: {
      name: 'Attack',
      property: 'attack',
    },
    stat3: {
      name: 'Sp. Attack',
      property: 'special_attack',
    },
    stat4: {
      name: 'Defense',
      property: 'defense',
    },
    stat5: {
      name: 'Sp. Defense',
      property: 'special_defense',
    },
    stat6: {
      name: 'Speed',
      property: 'speed',
    },
  }

  pokemonEvolutions: PokemonCompount[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemon: PokemonCompount,
    private fetchPokemonService: FetchpokemonService
  ) {
    this.getPokemonEvolutionObjects(fetchPokemonService);
  }

  getPokemonEvolutionObjects(fetchPokemonService: FetchpokemonService) {
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
