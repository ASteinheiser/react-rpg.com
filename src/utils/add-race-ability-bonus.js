import { RACE_ABILITY_BONUS } from '../config/constants';

/**
 * Each Race has an ability bonus, and we want to reflect that
 *
 * @param {*} ability The value of the ability we want to alter
 */
export default function addRaceAbilityBonus(ability) {
    ability += RACE_ABILITY_BONUS;
    return ability;
}
