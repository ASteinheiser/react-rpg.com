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
// set the minimum level for tier 2 items
export const TIER_2 = 10;
// set the pixel values for the different screen sizes
export const SCREEN_SMALL_WIDTH = 410;
export const SCREEN_SMALL_HEIGHT = 410;
export const SCREEN_MEDIUM_WIDTH = 600;
export const SCREEN_MEDIUM_HEIGHT = 680;
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
export const STARTING_ABILITY_POINTS = 12;
// The number of ability points the player gets to allocate on levelling up
export const LEVEL_UP_ABILITY_POINTS = 2;
// Starting player health
export const BASE_HEALTH = 10;
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
export const I_KEY = 73;
export const SPACE_KEY = 32;
export const ENTER_KEY = 13;
