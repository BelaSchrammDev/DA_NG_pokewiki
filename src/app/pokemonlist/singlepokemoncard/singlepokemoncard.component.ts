import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NameUrlPair, PokemonCompount } from '../../shared/models/pokemon.models';
import { FetchpokemonService } from '../../shared/services/fetchpokemon.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BigpokemoncardComponent } from '../bigpokemoncard/bigpokemoncard.component';

const typeColors = [
  { type: 'normal', color: '#A8A77A' },
  { type: 'fire', color: '#EE8130' },
  { type: 'water', color: '#6390F0' },
  { type: 'electric', color: '#F7D02C' },
  { type: 'grass', color: '#7AC74C' },
  { type: 'ice', color: '#96D9D6' },
  { type: 'fighting', color: '#C22E28' },
  { type: 'poison', color: '#A33EA1' },
  { type: 'ground', color: '#E2BF65' },
  { type: 'flying', color: '#A98FF3' },
  { type: 'psychic', color: '#F95587' },
  { type: 'bug', color: '#A6B91A' },
  { type: 'rock', color: '#B6A136' },
  { type: 'ghost', color: '#735797' },
  { type: 'dragon', color: '#6F35FC' },
  { type: 'dark', color: '#705746' },
  { type: 'steel', color: '#B7B7CE' },
  { type: 'fairy', color: '#D685AD' },
];


@Component({
  selector: 'app-singlepokemoncard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singlepokemoncard.component.html',
  styleUrl: './singlepokemoncard.component.scss'
})
export class SinglepokemoncardComponent implements OnChanges {
  pokeData = inject(FetchpokemonService);
  @Input() pokemonID: NameUrlPair;
  pokemon?: PokemonCompount;
  pokemonLoaded = false;

  cardBackGround: string = '#FFFFFF';
  typebadge1Color: string = '#FFFFFF';
  typebadge2Color: string = '#FFFFFF';

  constructor(
    public dialog: MatDialog,
    private fetchPokemonService: FetchpokemonService
  ) {
    this.pokemonID = { name: '', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pokemonID.name !== '' && changes['pokemonID'].currentValue !== changes['pokemonID'].previousValue) {
      this.fetchPokemonService.getPokemonObjectByID(this.pokemonID).then((pokemon) => {
        this.pokemon = pokemon;
        this.pokemonLoaded = true;
        if (this.pokemon) {
          this.typebadge1Color = this.getPokemonTypeColor(this.pokemon.type1);
          this.typebadge2Color = this.getPokemonTypeColor(this.pokemon.type2);
          this.cardBackGround = `linear-gradient(45deg, white 0%, ${this.getPokemonTypeColor(this.pokemon.type1)} 100%)`;
        }
      });
    }
  }


  openBigCard() {
    if (this.pokemon == undefined) return;
    const dialogRef = this.dialog.open(
      BigpokemoncardComponent,
      {
        data: this.pokemon,
        width: '80%',
        panelClass: 'custom_dialog'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  getPokemonTypeColor(type: string) {
    if (type == undefined) return '#FFFFFF';
    const colorObj = typeColors.find((color) => color.type === type);
    if (colorObj) return colorObj.color;
    else return typeColors[0].color;
  }
}
