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
    pokemonEvotutions: PokemonEvolution[] = [];


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


    saveEvolutionObject(evolution: PokemonEvolution) {
        if (this.pokemonEvotutions.find(evo => evo.id === evolution.id)) return;
        this.pokemonEvotutions.push(evolution);
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
            this.saveEvolutionObject(evolutionJSON);
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
        newPokemonObject.evolutionChain = evolution;
        return newPokemonObject;
    }


    copyStats(newPokemonObject: PokemonCompount, stats: Stat[]) {
        let stat_maxvalue = 0;
        for (let index = 0; index < stats.length; index++) {
            const statItem: Stat = stats[index];
            let statName = statItem.stat['name'];
            if (statName.includes('-')) statName = statName.replace('-', '_');
            (newPokemonObject as any)[statName as keyof PokemonCompount] = statItem.base_stat;
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


    getPokemonImageByName(pokemonName: string) {
        const pokemon = this.getPokemonCompountByName(pokemonName);
        return pokemon ? pokemon.image : './img/pokemon.png';
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
