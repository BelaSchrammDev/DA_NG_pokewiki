import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonCompount } from '../../../../shared/models/pokemon.models';
import { FetchpokemonService } from '../../../../shared/services/fetchpokemon.service';
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
  @Input() pokemonID!: string | undefined;
  @Input() selectable!: boolean;
  @Input() marginLeft: number = 0;
  @Input() sublevel: number = 0;
  @Output() onClickEvolution = new EventEmitter<PokemonCompount>();
  pokemon: PokemonCompount | undefined = undefined;

  constructor(
    private fetchpokemonService: FetchpokemonService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.pokemonID) {
      let realPokemonID = this.fetchpokemonService.getPokemonNameUrlPairByID(this.pokemonID);
      if (!realPokemonID) return;
      this.pokemon = await this.fetchpokemonService.getPokemonObjectByID(realPokemonID);
    }
  }

  clickPokemon() {
    if (!this.selectable && !this.pokemon) return;
    this.onClickEvolution.emit(this.pokemon);
  }
}
