import { Injectable } from '@angular/core';
import {
    PokemonCompount,
    NameUrlPair,
    Pokemon,
    PokemonEvolution,
    Stat,
    PokemonSpecies,
} from '../models/pokemon.models';


@Injectable({
    providedIn: 'root'
})
export class FetchpokemonService {

    all_PokeMons: NameUrlPair[] = [];
    allListLoaded = false;

    allPokemonJsons: PokemonCompount[] = [];


    constructor() {
        this.loadPokemonList();
    }


    async loadPokemonList() {
        const url = `https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        this.all_PokeMons = responseAsJson.results;
        this.allListLoaded = true;
    }


    /**
    * get the pokemon JSON Object
    * save the loadet pokemons in array, for later use, it is needed
    * 
    * @param {NameUrlPair} pokemonID - NameUrlPair
    * @returns - PokemonCompount Object
    */
    async getPokemonObjectByID(pokemonID: NameUrlPair) {
        if (!pokemonID) return undefined;
        if (!this.ifPokemonCompountExists(pokemonID.name)) {
            let speciesJSON: PokemonSpecies = await this.fetchAndGetJSON(pokemonID.url);
            let evolutionJSON: PokemonEvolution = await this.fetchAndGetJSON(speciesJSON.evolution_chain.url);
            let pokemonJSON = await this.fetchAndGetJSON('https://pokeapi.co/api/v2/pokemon/' + speciesJSON.id);
            let newPokemonCompount = this.createNewPokemonObject(speciesJSON, pokemonJSON, evolutionJSON);
            this.allPokemonJsons.push(newPokemonCompount);
            return newPokemonCompount;
        }
        return this.getPokemonCompountByName(pokemonID.name);
    }


    getPokemonIDByName(pokemonName: string): NameUrlPair | undefined {
        return this.all_PokeMons.find(pokemon => pokemon.name === pokemonName);
    }


    getPokemonCompountByName(pokemonName: string): PokemonCompount | undefined {
        return this.allPokemonJsons.find(pokemon => pokemon.name === pokemonName);
    }


    ifPokemonCompountExists(pokemonName: string): boolean {
        return this.allPokemonJsons.some(pokemon => pokemon.name === pokemonName);
    }


    async fetchAndGetJSON(url: string) {
        let response = await fetch(url);
        return await response.json();
    }


    // pull all required data from the api into a separate JSON object
    createNewPokemonObject(species: PokemonSpecies, pokemon: Pokemon, evolution: PokemonEvolution) {

        let newPokemonObject = new PokemonCompount();
        newPokemonObject.name = this.getPascalCaseWord(species.name);
        newPokemonObject.pokemonID = species.name;
        this.addPokemonTypes(newPokemonObject, pokemon);
        this.copyPropertys(newPokemonObject, species, ['id', 'base_happiness', 'capture_rate', 'hatch_counter']);
        this.copyPropertys(newPokemonObject, pokemon, ['height', 'weight']);
        this.copyStats(newPokemonObject, pokemon.stats);
        newPokemonObject.image = this.getPokemonImageUrlOrDefault(pokemon);
        newPokemonObject.evolutions = this.getEvolutionsArray(evolution);
        return newPokemonObject;
    }


    copyStats(newPokemonObject: PokemonCompount, stats: Stat[]) {
        let stat_maxvalue = 0;
        for (let index = 0; index < stats.length; index++) {
            const statItem: Stat = stats[index];
            const statName = statItem.stat['name'];
            switch (statName) {
                case 'hp':
                    newPokemonObject.hp = statItem.base_stat;
                    break;
                case 'attack':
                    newPokemonObject.attack = statItem.base_stat;
                    break;
                case 'defense':
                    newPokemonObject.defense = statItem.base_stat;
                    break;
                case 'special-attack':
                    newPokemonObject['special-attack'] = statItem.base_stat;
                    break;
                case 'special-defense':
                    newPokemonObject['special-defense'] = statItem.base_stat;
                    break;
                case 'speed':
                    newPokemonObject.speed = statItem.base_stat;
                    break;
            }
            if (stat_maxvalue < statItem.base_stat) stat_maxvalue = statItem.base_stat;
        }
        newPokemonObject['stat_maxvalue'] = Math.max(100, stat_maxvalue);
    }


    // some pokemons are missing sprites
    // in this case the default image is loaded
    getPokemonImageUrlOrDefault(pokemon: Pokemon) {
        const imgURL = pokemon['sprites']['other']['official-artwork']['front_default'];
        return imgURL ? imgURL : './img/pokemon.png';
    }


    copyPropertys(newPokemonObject: any, sourceObject: any, fields: string[]) {
        for (let index = 0; index < fields.length; index++) {
            const field = fields[index];
            if (sourceObject[field]) newPokemonObject[field] = sourceObject[field];
        }
    }


    addPokemonTypes(newPokemonObject: PokemonCompount, pokemon: Pokemon) {
        newPokemonObject.type1 = pokemon.types[0].type.name;
        newPokemonObject.type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : '---';
    }


    getEvolutionsArray(evolution: PokemonEvolution) {
        let evoArray = [];
        evoArray.push(evolution.chain.species.name);
        if (evolution.chain.evolves_to.length > 0) {
            evoArray.push(evolution.chain.evolves_to[0].species.name);
            if (evolution.chain.evolves_to[0].evolves_to.length > 0) {
                evoArray.push(evolution.chain.evolves_to[0].evolves_to[0].species.name);
            }
        }
        return evoArray;
    }


    /**
    * converts a string to pascalcase
    * 
    * @param {string} word - string that be converted
    * @returns - to pascalcase converted string
    */
    getPascalCaseWord(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}
