// max number of inventory items
export const MAX_ITEMS = 8;
export const MAX_ITEMS_UPGRADE = 12;
// how far the player can 'see' or 'explore'
export const SIGHT_RADIUS = 3;
// how fast the player move animation plays (ms)
export const ANIMATION_SPEED = 350;
// size of tiles
export const SPRITE_SIZE = 40;
// number of tiles in the map
const TILE_HEIGHT = 15;
const TILE_WIDTH = 20;
export const MAP_DIMENSIONS = [TILE_WIDTH, TILE_HEIGHT];
// map size is set to 800 x 600
export const MAP_HEIGHT = SPRITE_SIZE * TILE_HEIGHT;
export const MAP_WIDTH = SPRITE_SIZE * TILE_WIDTH;
// configs for random map generation
export const MAX_TUNNELS = 60;
export const MAX_LENGTH = 5;
// set the main game's start map
export const START_MAP = '1_1';
// set the duration for showing the snackbar (ms)
export const SNACK_DURATION = 2500;
// set the size for the game viewport (in pixels)
export const GAME_VIEWPORT_SIZE = 350;
export const GAME_VIEWPORT_SIZE_LG = 400;
// set the minimum level for tier X items
export const TIER_2 = 10;
export const TIER_3 = 20;
export const TIER_4 = 30;
// set the pixel values for the different screen sizes
export const SCREEN_SMALL_WIDTH = 410;
export const SCREEN_SMALL_HEIGHT = 410;
export const SCREEN_MEDIUM_WIDTH = 600;
export const SCREEN_MEDIUM_HEIGHT = 680;
export const MIN_WIDTH_FOR_JOURNAL = 1100;
export const MIN_SIDESCREEN_WIDTH_FOR_JOURNAL = 1100;
// set the number of tiles to pad the map with (so the player cant see edge)
export const MAP_PADDING_DISTANCE = 5;
// set the time for the map to transition in/out
export const MAP_TRANSITION_DELAY = 500;
// The max value any ability score can have
export const MAX_ABILITY_SCORE = 20;
// The default value of an ability score
export const STARTING_ABILITY_SCORE_VALUE = 8;
// The default value of an ability score with race bonus
export const RACE_ABILITY_BONUS = 2;
// The starting points a player can allocate
export const STARTING_ABILITY_POINTS = 8;
// The number of levels a player needs to level up to gain ability points
export const LEVELS_BETWEEN_ABILITY_POINT_GAIN = 3;
// The number of ability points the player gets to allocate on levelling up
export const LEVEL_UP_ABILITY_POINTS = 2;
// Base player health/mana values
export const BASE_HEALTH = 10;
export const BASE_MANA = 5;
// Base health/mana level up values
export const MIN_HEALTH_BONUS = 2;
export const MIN_MANA_BONUS = 5;
// Set macros for key codes
export const UP_KEY = 38;
export const DOWN_KEY = 40;
export const LEFT_KEY = 37;
export const RIGHT_KEY = 39;
export const W_KEY = 87;
export const S_KEY = 83;
export const A_KEY = 65;
export const D_KEY = 68;
export const E_KEY = 69;
export const U_KEY = 85;
export const H_KEY = 72;
export const I_KEY = 73;
export const J_KEY = 74;
export const C_KEY = 67;
export const B_KEY = 66;
export const SPACE_KEY = 32;
export const ENTER_KEY = 13;
export const ESC_KEY = 27;

// If the player is unarmed, we need them to still be able to attack
export const UNARMED_DAMAGE = '1d4';
export const FISTS = {
    name: 'fists',
    kind: 'melee',
    range: 1,
    damage: UNARMED_DAMAGE,
    type: 'weapon',
};

// The player regenerates mana at this rate
export const PASSIVE_MANA_RESTORE_TURNS = 10;
export const OUT_OF_COMBAT_RANGE = 4;

// For calculating buy/sell prices
export const MIN_PRICE_PERCENT = 0.1;
export const MID_PRICE_PERCENT = 0.6;
export const MAX_PRICE_PERCENT = 1.2;

// The number of turns an AI change stays in effect
export const AI_CHANGE_TURNS = 3;
// Damage inflicted by poison every time it hits
export const POISON_DAMAGE = '1d4';
export const TURNS_FOR_POISON = 3;
export const SHOCK_DAMAGE = '1d4';

// The maximum amount of journal entries. If this is too large it can slow the game down
export const MAX_JOURNAL_ENTRIES = 100;

// Not entirely sure why, but apparently we need to apply some hue offsets
// but only to certain items
export const HUE_OFFSETS = {
    skinColour: -70,
    hairColour: -70,
    armourColour: +70,
    clothesColour: 0,
}

// Reference URL for loading tiles from public/ directory
export const GET_REF_URL = () => {

    let url = import.meta.url;
    let pos;

    const isProd = import.meta.env.PROD;

    if (isProd) {
        pos = url.indexOf('assets');
    } else {
        pos = url.indexOf('src');
    }
    
    const newURL = url.substring(0, pos) + 'tiles/';

    return newURL;
}

export const REF_URL = GET_REF_URL();
