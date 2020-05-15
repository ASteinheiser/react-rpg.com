import _cloneDeep from 'lodash.clonedeep';
import calculateModifier from '../../utils/calculate-modifier';
import calculateMaxManaPool from '../../utils/calculate-max-mana-pool';
import calculateMaxHpPool from '../../utils/calculate-max-hp-pool';
import calculateDefenceBonus from '../../utils/calculate-defence-bonus';

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
    levelUp: { level: 0, hp: 0, mana: 0 },
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

            const previousDex = calculateModifier(state.abilities.dexterity);
            const currentDex = calculateModifier(payload.abilities.dexterity);

            const prevDefenceBonus = calculateDefenceBonus(previousDex);
            const currDefenceBonus = calculateDefenceBonus(currentDex);

            state.defence = state.defence - prevDefenceBonus + currDefenceBonus;

            return { ...state, abilities: payload.abilities };

        case 'UNEQUIP_ITEM':
            newState = _cloneDeep(state);

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

                    case 'mana':
                        newState.mana -= payload.effect[effectName];
                        if (newState.mana < 1) newState.mana = 1;
                        newState.maxMana -= payload.effect[effectName];
                        break;

                    default:
                }
            });

            // check the type
            switch (payload.type) {
                case 'weapon':
                    delete newState.equippedItems.weapon;
                    break;

                case 'armor::body':
                    delete newState.equippedItems.armor.body;
                    break;

                case 'armor::helmet':
                    delete newState.equippedItems.armor.helmet;
                    break;

                case 'armor::pants':
                    delete newState.equippedItems.armor.pants;
                    break;

                case 'armor::boots':
                    delete newState.equippedItems.armor.boots;
                    break;

                case 'armor::gloves':
                    delete newState.equippedItems.armor.gloves;
                    break;

                case 'ring':
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
                    if (newState.equippedItems.weapon.effect) {
                        removeEffects(newState.equippedItems.weapon, newState);
                    }
                    newState.equippedItems.weapon = item;
                    break;

                case 'armor::body':
                    if (
                        newState.equippedItems.armor &&
                        newState.equippedItems.armor.body
                    ) {
                        removeEffects(
                            newState.equippedItems.armor.body,
                            newState
                        );
                    }
                    // if there's already armor
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
                        removeEffects(
                            newState.equippedItems.armor.helmet,
                            newState
                        );
                    }
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
                        removeEffects(
                            newState.equippedItems.armor.pants,
                            newState
                        );
                    }
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
                        removeEffects(
                            newState.equippedItems.armor.gloves,
                            newState
                        );
                    }
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
                        removeEffects(
                            newState.equippedItems.armor.boots,
                            newState
                        );
                    }
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

                    newState.equippedItems.ring = item;
                    break;

                default:
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

                    case 'mana':
                        newState.mana += payload.effect[effectName];
                        newState.maxMana += payload.effect[effectName];
                        break;

                    default:
                }
            });
            return newState;

        case 'HEAL_HP':
            // heal the hp
            let _hp = state.hp + payload;
            // dont go above max hp
            if (_hp > state.maxHp) _hp = state.maxHp;

            return { ...state, hp: _hp };

        case 'RESTORE_MANA':
            // regenerate the mana
            let _mana = state.mana + payload.amount;
            // don't go above max mana
            if (_mana > state.maxMana) _mana = state.maxMana;

            return { ...state, mana: _mana };

        case 'CAST_SPELL':
            return { ...state, mana: state.mana - payload.projectile.manaCost };

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

                newState.levelUp.level = newState.level;
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

const removeEffects = (item, newState) => {
    Object.keys(item.effect).forEach(effectName => {
        switch (effectName) {
            case 'defence':
                newState.defence -= item.effect[effectName];
                break;

            case 'hp':
                newState.hp -= item.effect[effectName];
                if (newState.hp < 1) newState.hp = 1;
                newState.maxHp -= item.effect[effectName];
                break;

            case 'mana':
                newState.mana -= item.effect[effectName];
                if (newState.mana < 1) newState.mana = 1;
                newState.maxMana -= item.effect[effectName];
                break;

            default:
        }
    });
};

export default statsReducer;
