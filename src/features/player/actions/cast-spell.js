import { checkForMonster, applyEffects } from './move-player';
import { calculateDamage, d20 } from '../../../utils/dice';
import calculateModifier from '../../../utils/calculate-modifier';
import { SPRITE_SIZE } from '../../../config/constants';
import errorMessage from '../../dialog-manager/actions/error-message';
import { findTarget } from './attack-monster';

export default function castSpell() {
    return (dispatch, getState) => {
        const { stats, player, monsters, world } = getState();
        const { position, direction, spell } = player;

        if (spell === null) {
            dispatch(errorMessage('Select a spell first ("b")'));
            return;
        } else if (spell.manaCost > stats.mana) {
            dispatch(errorMessage('Not enough mana'));
            return;
        }

        const target = spell.target.split('::');

        if (target[0] === 'self') {
            dispatch({
                type: 'CAST_SPELL',
                payload: { position: position, projectile: spell },
            });

            const intelligenceModifier = calculateModifier(
                stats.abilities.intelligence
            );
            const healAmount =
                calculateDamage(spell.damage) +
                (intelligenceModifier > 0 ? intelligenceModifier : 0);

            if (target[1] === 'heal') {
                dispatch({
                    type: 'HEAL_HP',
                    payload: healAmount,
                });
            }

            dispatch({
                type: 'TAKE_TURN',
                payload: null,
            });
            dispatch(applyEffects());
        } else if (target[0] === 'enemy') {
            const spellPosition = dispatch(
                findTarget(position, direction, spell.range * SPRITE_SIZE)
            );

            const { currentMap } = world;
            const { components } = monsters;

            const monsterId = dispatch(checkForMonster(spellPosition));
            if (monsterId) {
                // If we're targetting a monster
                const currMonster = components[currentMap][monsterId];
                const monsterPos = currMonster.position;

                const modifier = calculateModifier(
                    stats.abilities.intelligence
                );

                const roll = d20();
                const attackValue = roll + modifier;

                dispatch({
                    type: 'CAST_SPELL',
                    payload: { position: spellPosition, projectile: spell },
                });

                if (roll === 20) {
                    dispatch({
                        type: 'CRITICAL_HIT',
                        payload: {
                            notation: 'd20 + ' + modifier,
                            roll: roll,
                            ability: 'intelligence',
                        },
                    });
                } else {
                    dispatch({
                        type: 'ABILITY_CHECK',
                        payload: {
                            notation: 'd20 + ' + modifier,
                            roll: attackValue,
                            ability: 'intelligence',
                            check: currMonster.defence,
                            entity: currMonster.type,
                            against: 'defence',
                        },
                    });
                }

                const damage =
                    roll === 20
                        ? calculateDamage(spell.damage, true)
                        : attackValue >= currMonster.defence
                        ? calculateDamage(spell.damage, false)
                        : 0;

                // deal damage to monster
                dispatch({
                    type: 'DAMAGE_TO_MONSTER',
                    payload: {
                        damage,
                        id: currMonster.id,
                        map: currentMap,
                        entity: currMonster.type,
                        from: 'player',
                    },
                });

                // check if monster died
                if (currMonster.hp - damage <= 0) {
                    // and get some exp
                    dispatch({
                        type: 'GET_EXP',
                        payload: currMonster.exp,
                    });
                    if (stats.exp + currMonster.exp >= stats.expToLevel) {
                        dispatch({
                            type: 'PAUSE',
                            payload: {
                                pause: true,
                                levelUp: true,
                            },
                        });
                    }
                    // play death sound
                    dispatch({
                        type: 'MONSTER_DIED',
                        payload: currMonster.type,
                    });
                    // replace monster will blood spill
                    // need to pass relative tile index
                    dispatch({
                        type: 'ADD_BLOOD_SPILL',
                        payload: {
                            x: monsterPos[0] / SPRITE_SIZE,
                            y: monsterPos[1] / SPRITE_SIZE,
                        },
                    });
                } else if (damage > 0) {
                    if (spell.effects && spell.effects.changeAI) {
                        const { to, turns, proc } = spell.effects.changeAI;

                        // If we have a probabilty to hit, then use that to check if we do
                        if (proc) {
                            if (proc()) {
                                dispatch({
                                    type: 'CHANGE_AI',
                                    payload: {
                                        from: currMonster.ai,
                                        ai: to,
                                        turns,
                                        id: currMonster.id,
                                        map: currentMap,
                                        entity: currMonster.type,
                                        original: currMonster.originalAI,
                                    },
                                });
                            }
                        } else {
                            // Otherwise, just set the AI to whatever it is
                            dispatch({
                                type: 'CHANGE_AI',
                                payload: {
                                    from: currMonster.ai,
                                    ai: to,
                                    turns,
                                    id: currMonster.id,
                                    map: currentMap,
                                    entity: currMonster.type,
                                    original: currMonster.originalAI,
                                },
                            });
                        }
                    }
                }

                // take a turn if the player attacked something
                dispatch({
                    type: 'TAKE_TURN',
                    payload: null,
                });

                dispatch(applyEffects());
            } else {
                // Hit a wall or something else
                dispatch({
                    type: 'CAST_SPELL',
                    payload: { position: spellPosition, projectile: spell },
                });
            }
        }
    };
}
