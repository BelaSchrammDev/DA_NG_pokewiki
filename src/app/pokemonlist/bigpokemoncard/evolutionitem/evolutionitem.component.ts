import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonCompount } from '../../../shared/models/pokemon.models';
import { FetchpokemonService } from '../../../shared/services/fetchpokemon.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-evolutionitem',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './evolutionitem.component.html',
  styleUrl: './evolutionitem.component.scss'
})
export class EvolutionitemComponent implements OnInit {
  @Input() pokemonName!: string | undefined;
  @Input() selectable!: boolean;
  @Input() marginLeft: number = 0;
  @Input() sublevel: number = 0;
  @Output() onClickEvolution = new EventEmitter<PokemonCompount>();
  evolution: PokemonCompount | undefined = undefined;

  constructor(
    private fetchpokemonService: FetchpokemonService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.pokemonName) {
      let pokemonID = this.fetchpokemonService.getPokemonIDByName(this.pokemonName);
      if (pokemonID) {
        this.evolution = await this.fetchpokemonService.getPokemonObjectByID(pokemonID);
      }
    }
  }

  clickEvolution() {
    if (!this.selectable || !this.evolution) return;
    this.onClickEvolution.emit(this.evolution);
  }
}
