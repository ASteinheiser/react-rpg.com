import addRaceAbilityBonus from '../utils/add-race-ability-bonus';
import setAbilityMinimum from '../utils/set-ability-minimum';

/**
 * Given the player's chosen race, deterine the bonuses they receive
 *
 * @param {*} characterRace The race of the player
 * @param {*} abilities The abilities the player currently has
 * @param {*} abilities_minimum The minimum abilities of the player
 */
export default function setRaceBonus(
    characterRace,
    abilities,
    abilities_minimum
) {
    switch (characterRace) {
        case 'Human':
            abilities.strength = addRaceAbilityBonus(abilities.strength);
            abilities.intelligence = addRaceAbilityBonus(
                abilities.intelligence
            );
            abilities_minimum.min_strength = setAbilityMinimum(
                abilities_minimum.min_strength
            );
            abilities_minimum.min_intelligence = setAbilityMinimum(
                abilities_minimum.min_intelligence
            );
            break;
        case 'Elf':
            abilities.dexterity = addRaceAbilityBonus(abilities.dexterity);
            abilities.charisma = addRaceAbilityBonus(abilities.charisma);
            abilities_minimum.min_dexterity = setAbilityMinimum(
                abilities_minimum.min_dexterity
            );
            abilities_minimum.min_charisma = setAbilityMinimum(
                abilities_minimum.min_charisma
            );
            break;
        case 'Dwarf':
            abilities.constitution = addRaceAbilityBonus(
                abilities.constitution
            );
            abilities.wisdom = addRaceAbilityBonus(abilities.wisdom);
            abilities_minimum.min_constitution = setAbilityMinimum(
                abilities_minimum.min_constitution
            );
            abilities_minimum.min_wisdom = setAbilityMinimum(
                abilities_minimum.min_wisdom
            );
            break;
        default:
    }
}
