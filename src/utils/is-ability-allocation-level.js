import { LEVELS_BETWEEN_ABILITY_POINT_GAIN } from '../config/constants';

/**
 * Determine if the level the player has reached is one in which they
 * are allocated some more ability points
 *
 * @param {*} level The level the player just reached
 */
export default function isAbilityAllocationLevel(level) {
    return level % LEVELS_BETWEEN_ABILITY_POINT_GAIN === 0;
}
