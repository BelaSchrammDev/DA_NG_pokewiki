export class PokemonCompount {
    [key: string]: any;
    name: string = '';
    pokemonID: string = '';
    type1: string = '';
    type2: string = '';
    id: number = 0;
    base_happiness: number = 0;
    capture_rate: number = 0;
    hatch_counter: number = 0;
    height: number = 0;
    weight: number = 0;
    hp: number = 0;
    attack: number = 0;
    defense: number = 0;
    special_attack: number = 0;
    special_defense: number = 0;
    speed: number = 0;
    stat_maxvalue: number = 0;
    image: string = '';
    evolutions: string[] = [];
}

export interface NameUrlPair {
    name: string;
    url: string;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: NameUrlPair;
    version: NameUrlPair;
}

export interface FormDescription {
    description: string;
    language: NameUrlPair;
}

export interface Genera {
    genus: string;
    language: NameUrlPair;
}

export interface Name {
    language: NameUrlPair;
    name: string;
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: NameUrlPair;
}

export interface Variety {
    is_default: boolean;
    pokemon: Pokemon;
}

export interface PokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    color: NameUrlPair;
    egg_groups: NameUrlPair[];
    evolution_chain: { url: string };
    evolves_from_species: { name: string; url: string };
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: FormDescription[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genera[];
    generation: NameUrlPair;
    growth_rate: NameUrlPair;
    habitat: any;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: any[];
    pokedex_numbers: PokedexNumber[];
    shape: NameUrlPair;
    varieties: Variety[];
}

export interface EvolutionDetail {
    gender: any;
    held_item: any;
    item: {
        name: string;
        url: string;
    } | null;
    known_move: any;
    known_move_type: any;
    location: any;
    min_affection: any;
    min_beauty: any;
    min_happiness: any;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: any;
    party_type: any;
    relative_physical_stats: any;
    time_of_day: string;
    trade_species: any;
    trigger: NameUrlPair;
    turn_upside_down: boolean;
}

export interface EvolvesTo {
    evolution_details: EvolutionDetail[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
}

export interface Chain {
    evolution_details: EvolutionDetail[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
}

export interface PokemonEvolution {
    baby_trigger_item: any;
    chain: Chain;
    id: number;
}

export interface VersionDetail {
    rarity: number;
    version: NameUrlPair;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NameUrlPair;
    version_group: NameUrlPair;
}

export interface GameIndex {
    game_index: number;
    version: NameUrlPair;
}

export interface PokemonSprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string | null;
            front_female: string | null;
        };
        home: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        'official-artwork': {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
    };
    versions: {
        'generation-i': {
            'red-blue': {
                back_default: string | null;
                back_gray: string | null;
                back_transparent: string | null;
                front_default: string | null;
                front_gray: string | null;
                front_transparent: string | null;
            };
            yellow: {
                back_default: string | null;
                back_gray: string | null;
                back_transparent: string | null;
                front_default: string | null;
                front_gray: string | null;
                front_transparent: string | null;
            };
        };
        'generation-ii': {
            crystal: {
                back_default: string | null;
                back_shiny: string | null;
                back_shiny_transparent: string | null;
                back_transparent: string | null;
                front_default: string | null;
                front_shiny: string | null;
                front_shiny_transparent: string | null;
                front_transparent: string | null;
            };
            gold: {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
                front_transparent: string | null;
            };
            silver: {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
                front_transparent: string | null;
            };
        };
        'generation-iii': {
            emerald: {
                front_default: string | null;
                front_shiny: string | null;
            };
            'firered-leafgreen': {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
            };
            'ruby-sapphire': {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
            };
        };
        'generation-iv': {
            'diamond-pearl': {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            'heartgold-soulsilver': {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            platinum: {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-v': {
            'black-white': {
                animated: {
                    back_default: string | null;
                    back_female: string | null;
                    back_shiny: string | null;
                    back_shiny_female: string | null;
                    front_default: string | null;
                    front_female: string | null;
                    front_shiny: string | null;
                    front_shiny_female: string | null;
                };
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-vi': {
            'omegaruby-alphasapphire': {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            'x-y': {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-vii': {
            icons: {
                front_default: string | null;
                front_female: string | null;
            };
            'ultra-sun-ultra-moon': {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-viii': {
            icons: {
                front_default: string | null;
                front_female: string | null;
            };
        };
    };
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface AbilityObject {
    ability: NameUrlPair;
    is_hidden: boolean;
    slot: number;
}

export interface HeldItemObject {
    item: NameUrlPair;
    version_details: VersionDetail[];
}

export interface GameIndexObject {
    game_index: number;
    version: NameUrlPair;
}

export interface MoveObject {
    move: NameUrlPair;
    version_group_details: VersionGroupDetail[];
}

export interface Pokemon {
    abilities: AbilityObject[];
    base_experience: number;
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: GameIndexObject[];
    height: number;
    held_items: HeldItemObject[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: MoveObject[];
    name: string;
    order: number;
    past_abilities: any[]; // You may define a proper interface for this if needed
    past_types: any[]; // You may define a proper interface for this if needed
    species: {
        name: string;
        url: string;
    };
    sprites: PokemonSprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}
