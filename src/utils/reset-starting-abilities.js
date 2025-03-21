// Reset all ability scores to default
import { STARTING_ABILITY_SCORE_VALUE } from '../config/constants';

/**
 * Reset the players ability scores to the default starting values,
 * and set the minimums also to the starting values
 *
 * @param {*} abilities The players abilities
 * @param {*} abilities_minimum The players minimum ability value
 */
export default function resetAbilityScoreValues(abilities, abilities_minimum) {
    abilities.strength = STARTING_ABILITY_SCORE_VALUE;
    abilities.constitution = STARTING_ABILITY_SCORE_VALUE;
    abilities.dexterity = STARTING_ABILITY_SCORE_VALUE;
    abilities.charisma = STARTING_ABILITY_SCORE_VALUE;
    abilities.intelligence = STARTING_ABILITY_SCORE_VALUE;
    abilities.wisdom = STARTING_ABILITY_SCORE_VALUE;
    abilities_minimum.min_strength = 0;
    abilities_minimum.min_constituion = 0;
    abilities_minimum.min_dexterity = 0;
    abilities_minimum.min_charisma = 0;
    abilities_minimum.min_intelligence = 0;
    abilities_minimum.min_wisdom = 0;
}
