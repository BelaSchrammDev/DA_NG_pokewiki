import { Component, HostListener, inject } from '@angular/core';
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
  autoload: boolean = true;
  maxPokemon: number = 50;


  @HostListener('window:scroll', [])
  onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (
        this.autoload
        && this.maxPokemon < this.pokeData.all_PokeMons.length
        && (scrollTop + clientHeight) >= scrollHeight - 100
      )
        this.maxPokemon += 50;
    }
  }
}
