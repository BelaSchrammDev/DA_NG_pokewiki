import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PokemonCompount } from '../../shared/models/pokemon.models';
import { CommonModule } from '@angular/common';
import { FetchpokemonService } from '../../shared/services/fetchpokemon.service';
import { EvolutionitemComponent } from './evolutionitem/evolutionitem.component';


@Component({
  selector: 'app-bigpokemoncard',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    EvolutionitemComponent
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
  ) { }

  selectEvolution(evolution: PokemonCompount) {
    if (this.pokemon === evolution) return;
    this.pokemon = evolution;
  }
}
