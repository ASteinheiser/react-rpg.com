import { SPRITE_SIZE } from '../config/constants';

// Retrieve a coordinate (x, y) from a position.
// This is mainly used to map the player to the specific (x, y) position in the map.
export function spriteToCoordinates(position) {
    return { x: position[0] / SPRITE_SIZE, y: position[1] / SPRITE_SIZE };
}
