import _cloneDeep from 'lodash.clonedeep';
import calculateModifier from '../../utils/calculate-modifier';
import calculateMaxManaPool from '../../utils/calculate-max-mana-pool';
import calculateMaxHpPool from '../../utils/calculate-max-hp-pool';

const initialState = {
    abilities: {
        constitution: 0,
        dexterity: 0,
        strength: 0,
        wisdom: 0,
        intelligence: 0,
        charisma: 0,
        points: 0,
    },
    character: {
        characterName: '',
        characterRace: '',
        characterClass: '',
    },
    hp: 0,
    abilityModifierHp: 0,
    maxHp: 0,
    mana: 0,
    abilityModifierMana: 0,
    maxMana: 0,
    defence: 0,
    level: 1,
    exp: 0,
    expToLevel: 20,
    gold: 0,
    equippedItems: {},
    levelUp: { level: 0, hp: 0 },
};

const statsReducer = (state = initialState, { type, payload }) => {
    let newState;

    switch (type) {
        case 'CREATE_CHARACTER':
            return {
                ...state,
                character: {
                    characterName: payload.characterName,
                    characterRace: payload.characterRace,
                    characterClass: payload.characterClass,
                },
            };

        case 'GET_GOLD':
            // add gold to current gold
            return { ...state, gold: state.gold + payload };

        case 'LOSE_GOLD':
            // add gold to current gold
            return { ...state, gold: state.gold - payload };

        case 'SET_ABILITY_SCORES':
            // calculate new mana
            const newAbilityModifierMana = calculateMaxManaPool(
                state.level,
                calculateModifier(payload.abilities.intelligence)
            );
            const manaDifference =
                newAbilityModifierMana - state.abilityModifierMana;

            state.mana += manaDifference;
            state.maxMana += manaDifference;
            state.abilityModifierMana = newAbilityModifierMana;

            // calculate new hp
            const newAbilityModifierHp = calculateMaxHpPool(
                state.level,
                calculateModifier(payload.abilities.constitution)
            );
            const hpDifference = newAbilityModifierHp - state.abilityModifierHp;

            state.hp += hpDifference;
            state.maxHp += hpDifference;
            state.abilityModifierHp = newAbilityModifierHp;

            const previous_dex = calculateModifier(state.abilities.dexterity);
            const current_dex = calculateModifier(payload.abilities.dexterity);

            if (previous_dex <= 0) {
                state.defence += current_dex;
            } else {
                state.defence = state.defence - previous_dex + current_dex;
            }

            return { ...state, abilities: payload.abilities };

        case 'UNEQUIP_ITEM':
            newState = _cloneDeep(state);
            // check the type
            switch (payload.type) {
                case 'weapon':
                    delete newState.equippedItems.weapon;
                    break;

                case 'armor::body':
                    newState.defence -= payload.defence;
                    delete newState.equippedItems.armor.body;
                    break;

                case 'armor::helmet':
                    newState.defence -= payload.defence;
                    delete newState.equippedItems.armor.helmet;
                    break;

                case 'armor::pants':
                    newState.defence -= payload.defence;
                    delete newState.equippedItems.armor.pants;
                    break;

                case 'armor::boots':
                    newState.defence -= payload.defence;
                    delete newState.equippedItems.armor.boots;
                    break;

                case 'armor::gloves':
                    newState.defence -= payload.defence;
                    delete newState.equippedItems.armor.gloves;
                    break;

                case 'ring':
                    // iterate over each effect
                    Object.keys(payload.effect).forEach(effectName => {
                        switch (effectName) {
                            case 'defence':
                                newState.defence -= payload.effect[effectName];
                                break;

                            case 'hp':
                                newState.hp -= payload.effect[effectName];
                                if (newState.hp < 1) newState.hp = 1;
                                newState.maxHp -= payload.effect[effectName];
                                break;

                            default:
                        }
                    });
                    delete newState.equippedItems.ring;

                    break;

                default:
            }

            return newState;

        case 'EQUIP_ITEM':
            newState = _cloneDeep(state);
            const item = payload;
            // see what type of item it is
            switch (item.type) {
                case 'weapon':
                    newState.equippedItems.weapon = item;
                    break;

                case 'armor::body':
                    // if there's already armor
                    if (
                        newState.equippedItems.armor &&
                        newState.equippedItems.armor.body
                    ) {
                        // subtract it's benefits
                        newState.defence -=
                            newState.equippedItems.armor.body.defence;
                    }
                    newState.defence += item.defence;
                    // safely add new armor peice to object
                    newState.equippedItems.armor = {
                        ...newState.equippedItems.armor,
                        body: item,
                    };
                    break;

                case 'armor::helmet':
                    // if there's already armor
                    if (
                        newState.equippedItems.armor &&
                        newState.equippedItems.armor.helmet
                    ) {
                        // subtract it's benefits
                        newState.defence -=
                            newState.equippedItems.armor.helmet.defence;
                    }
                    newState.defence += item.defence;
                    // safely add new armor peice to object
                    newState.equippedItems.armor = {
                        ...newState.equippedItems.armor,
                        helmet: item,
                    };
                    break;

                case 'armor::pants':
                    // if there's already armor
                    if (
                        newState.equippedItems.armor &&
                        newState.equippedItems.armor.pants
                    ) {
                        // subtract it's benefits
                        newState.defence -=
                            newState.equippedItems.armor.pants.defence;
                    }
                    newState.defence += item.defence;
                    // safely add new armor peice to object
                    newState.equippedItems.armor = {
                        ...newState.equippedItems.armor,
                        pants: item,
                    };
                    break;

                case 'armor::gloves':
                    // if there's already armor
                    if (
                        newState.equippedItems.armor &&
                        newState.equippedItems.armor.gloves
                    ) {
                        // subtract it's benefits
                        newState.defence -=
                            newState.equippedItems.armor.gloves.defence;
                    }
                    newState.defence += item.defence;
                    // safely add new armor peice to object
                    newState.equippedItems.armor = {
                        ...newState.equippedItems.armor,
                        gloves: item,
                    };
                    break;

                case 'armor::boots':
                    // if there's already armor
                    if (
                        newState.equippedItems.armor &&
                        newState.equippedItems.armor.boots
                    ) {
                        // subtract it's benefits
                        newState.defence -=
                            newState.equippedItems.armor.boots.defence;
                    }
                    newState.defence += item.defence;
                    // safely add new armor peice to object
                    newState.equippedItems.armor = {
                        ...newState.equippedItems.armor,
                        boots: item,
                    };
                    break;

                case 'ring':
                    const equippedRing = newState.equippedItems.ring;
                    // if there's already a ring
                    if (equippedRing) {
                        // subtract it's benefits
                        Object.keys(equippedRing.effect).forEach(effectName => {
                            switch (effectName) {
                                case 'defence':
                                    newState.defence -=
                                        equippedRing.effect[effectName];
                                    break;

                                case 'hp':
                                    newState.hp -=
                                        equippedRing.effect[effectName];
                                    if (newState.hp < 1) newState.hp = 1;
                                    newState.maxHp -=
                                        equippedRing.effect[effectName];
                                    break;

                                default:
                            }
                        });
                    }

                    // iterate over each new effect
                    Object.keys(item.effect).forEach(effectName => {
                        switch (effectName) {
                            case 'defence':
                                newState.defence += item.effect[effectName];
                                break;

                            case 'hp':
                                newState.hp += item.effect[effectName];
                                newState.maxHp += item.effect[effectName];
                                break;

                            default:
                        }
                    });

                    newState.equippedItems.ring = item;
                    break;

                default:
            }
            return newState;

        case 'HEAL_HP':
            // heal the hp
            let _hp = state.hp + payload;
            // dont go above max hp
            if (_hp > state.maxHp) _hp = state.maxHp;

            return { ...state, hp: _hp };

        case 'CAST_SPELL':
            return { ...state, mana: state.mana - payload.spell.manaCost };

        case 'DAMAGE_TO_PLAYER':
            return { ...state, hp: state.hp - payload.damage };

        case 'GET_EXP':
            newState = _cloneDeep(state);

            const newTotalExp = state.exp + payload;
            const { expToLevel } = state;
            // if they are leveling up
            if (newTotalExp >= expToLevel) {
                // increment level
                newState.level += 1;

                // calculate leftover exp if it isn't exactly enough
                if (!(newState.exp === expToLevel)) {
                    const leftoverExp = newTotalExp % expToLevel;
                    newState.exp = leftoverExp;
                }

                // set next exp goal to be 1.5 times as much if player is 5 or less
                if (newState.level < 6) {
                    newState.expToLevel = Math.floor(state.expToLevel * 1.5);
                } // otherwise set it to be 1.25 times as much
                else if (newState.level < 20) {
                    newState.expToLevel = Math.floor(state.expToLevel * 1.25);
                } else {
                } // let the exp goal remain static if they are lv 20+

                // calculate new hp
                const newAbilityModifierHp = calculateMaxHpPool(
                    newState.level,
                    calculateModifier(state.abilities.constitution)
                );
                newState.levelUp.hp =
                    newAbilityModifierHp - state.abilityModifierHp;
                newState.hp += newState.levelUp.hp;
                newState.maxHp += newState.levelUp.hp;
                newState.abilityModifierHp = newAbilityModifierHp;

                // calculate new mana
                const newAbilityModifierMana = calculateMaxManaPool(
                    newState.level,
                    calculateModifier(state.abilities.intelligence)
                );
                newState.levelUp.mana =
                    newAbilityModifierMana - state.abilityModifierMana;
                newState.mana += newState.levelUp.mana;
                newState.maxMana += newState.levelUp.mana;
                newState.abilityModifierMana = newAbilityModifierMana;

                // get more damage (+1)
                let moreDmg = 1;
                // 25% chance to get +2 damage on lv
                const chance = Math.floor(Math.random() * 100) + 1;
                if (chance <= 25) {
                    moreDmg += 1;
                }
                newState.damage += moreDmg;
                newState.levelUp.dmg = moreDmg;
            } else {
                // they aren't leveling up
                newState.exp += payload;
            }

            return newState;

        case 'RESET':
            return initialState;

        case 'LOAD_DATA':
            return { ...initialState, ...payload.stats };

        default:
            return state;
    }
};

export default statsReducer;
