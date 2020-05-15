import { LEVELS_BETWEEN_ABILITY_POINT_GAIN } from '../config/constants';

// Check if the level the player is at provides them with more ability points.
export default function isAbilityAllocationLevel(level) {
    return level % LEVELS_BETWEEN_ABILITY_POINT_GAIN === 0;
}
