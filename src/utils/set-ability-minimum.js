import { RACE_ABILITY_BONUS } from '../config/constants';

/**
 * Set the minimum ability score for an ability
 *
 * @param {*} minAbility The ability to set
 */
export default function addRaceAbilityBonus(minAbility) {
    minAbility = RACE_ABILITY_BONUS;
    return minAbility;
}
