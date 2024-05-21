import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EvolutionitemComponent } from './evolutionitem/evolutionitem.component';
import { PokemonCompount, PokemonEvolution } from '../../../shared/models/pokemon.models';
import { FetchpokemonService } from '../../../shared/services/fetchpokemon.service';

@Component({
  selector: 'app-evolutiontree',
  standalone: true,
  imports: [EvolutionitemComponent],
  templateUrl: './evolutiontree.component.html',
  styleUrl: './evolutiontree.component.scss'
})
export class EvolutiontreeComponent implements OnInit {
  @Input() evolutionTreeID: number | undefined = undefined;
  @Input() initialPokemonID: string | undefined = undefined;
  @Output() onSelectPokemon = new EventEmitter<PokemonCompount>();
  evolutionTree: PokemonEvolution | undefined = undefined;
  currentPokemonID: string | undefined = undefined;

  constructor(
    private fetchpokemonService: FetchpokemonService
  ) { }

  ngOnInit(): void {
    if (this.evolutionTreeID) {
      this.currentPokemonID = this.initialPokemonID;
      this.evolutionTree = this.fetchpokemonService.getEvolutionTreeByID(this.evolutionTreeID);
    }

  }

  selectPokemeon(pokemon: PokemonCompount) {
    this.currentPokemonID = pokemon.pokemonID;
    this.onSelectPokemon.emit(pokemon);
  }
}
