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

//Monster kill count and kill count increment
export const MONSTER_KILLS = {dragon: 0, goblin: 0, imp: 0, lich: 0, rat: 0, golem: 0, total: 0};
export function killDragon(){
    MONSTER_KILLS.dragon++;
    MONSTER_KILLS.total++;
}
export function killGoblin(){
    MONSTER_KILLS.goblin++;
    MONSTER_KILLS.total++;
}
export function killImp(){
    MONSTER_KILLS.imp++;
    MONSTER_KILLS.total++;
}
export function killLich(){
    MONSTER_KILLS.lich++;
    MONSTER_KILLS.total++;
}
export function killRat(){
    MONSTER_KILLS.rat++;
    MONSTER_KILLS.total++;
}
export function killGolem(){
    MONSTER_KILLS.golem++;
    MONSTER_KILLS.total++;
}
export function monsterKillReset(){
    MONSTER_KILLS.dragon = 0;
    MONSTER_KILLS.goblin = 0;
    MONSTER_KILLS.imp = 0;
    MONSTER_KILLS.lich = 0;
    MONSTER_KILLS.rat = 0;
    MONSTER_KILLS.golem = 0;
    MONSTER_KILLS.total = 0;
}

//Player death count and increment
export let PLAYER_DEATH_COUNT = 0;
export function playerDies(){
    PLAYER_DEATH_COUNT++;
}

//Highscore
export const TOP_KILLS = {dragon: 0, goblin: 0, imp: 0, lich: 0, rat: 0, golem: 0, total: 0};
export function setHighscore(){
    if(MONSTER_KILLS.total > TOP_KILLS.total){
        TOP_KILLS.dragon = MONSTER_KILLS.dragon;
        TOP_KILLS.goblin = MONSTER_KILLS.goblin;
        TOP_KILLS.imp = MONSTER_KILLS.imp;
        TOP_KILLS.lich = MONSTER_KILLS.lich;
        TOP_KILLS.rat = MONSTER_KILLS.rat;
        TOP_KILLS.golem = MONSTER_KILLS.golem;
        TOP_KILLS.total = MONSTER_KILLS.total;
    }
}
