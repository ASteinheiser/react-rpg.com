import { SPRITE_SIZE } from '../config/constants';

/**
 * Convert the position of a sprite to real world coordinates
 *
 * @param {*} position The sprites position
 */
export function spriteToCoordinates(position) {
    return { x: position[0] / SPRITE_SIZE, y: position[1] / SPRITE_SIZE };
}
