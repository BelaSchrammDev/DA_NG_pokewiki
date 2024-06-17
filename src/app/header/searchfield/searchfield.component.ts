import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchpokemonService } from '../../shared/services/fetchpokemon.service';

@Component({
  selector: 'app-searchfield',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './searchfield.component.html',
  styleUrl: './searchfield.component.scss'
})
export class SearchfieldComponent {
  searchstring: string = '';
  searchbutton: string = 'Search';
  searchbuttonDisabled: boolean = false;

  pokeData = inject(FetchpokemonService);

  @HostListener('input') onkeyDown() {
    let num = this.pokeData.getPokemonCountByName(this.searchstring);
    if (num === 0) {
      this.searchbutton = 'nothing found';
      this.searchbuttonDisabled = true;
    } else if (num === 1) {
      this.searchbutton = 'Show 1 hit';
      this.searchbuttonDisabled = false;
    } else {
      this.searchbutton = 'Show ' + num + ' hits';
      this.searchbuttonDisabled = false;
    }
  }

  goFiltered() {
    this.pokeData.setListedPokemonsToFiltered(this.searchstring);
  }

  showAll() {
    this.searchstring = '';
    this.searchbutton = 'nothing found';
    this.pokeData.setListedPokemonsToAll();
  }

}
