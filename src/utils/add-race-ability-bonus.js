import { RACE_ABILITY_BONUS } from '../config/constants';
export default function addRaceAbilityBonus(ability) {
    ability += RACE_ABILITY_BONUS;
    return ability;
}
