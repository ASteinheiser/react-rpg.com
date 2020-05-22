import React from 'react';
import cloneDeep from 'lodash.clonedeep';

import uuidv4 from '../../utils/uuid-v4';
import isAbilityAllocationLevel from '../../utils/is-ability-allocation-level';
import {
    LEVEL_UP_ABILITY_POINTS,
    MAX_JOURNAL_ENTRIES,
} from '../../config/constants';
import spells from '../../data/spells';

const initialState = {
    entries: [],
    scroll: true,
};

const aOrAn = nextWord =>
    'aeiou'.includes(nextWord.toLowerCase().charAt(0)) ? 'an' : 'a';

const colourise = (value, type) => (
    <span key={uuidv4()} className={type}>
        {value}
    </span>
);

const journalReducer = (state = initialState, { type, payload }) => {
    let newState;

    if (state.entries.length > MAX_JOURNAL_ENTRIES) {
        // Make sure we don't keep too many entries so we use less memory and don't slow down the game
        state.entries = state.entries.slice(
            state.entries.length - MAX_JOURNAL_ENTRIES
        );
    }

    switch (type) {
        case 'MONSTER_ABILITY_CHECK': {
            const { entity, attackValue, check, against, defender } = payload;

            newState = cloneDeep(state);

            if (defender === 'player') {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} attacked you with an
                            attack value of {colourise(attackValue, 'score')}{' '}
                            against your {colourise(against, 'ability')} value
                            of {colourise(check, 'score')}
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} attacked the{' '}
                            {colourise(defender, '')} with an attack value of{' '}
                            {colourise(attackValue, 'score')} against their{' '}
                            {colourise(against, 'ability')} value of{' '}
                            {colourise(check, 'score')}
                        </p>
                    ),
                });
            }
            return newState;
        }

        case 'CRITICAL_HIT': {
            const { ability, roll } = payload;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You performed {aOrAn(ability)}{' '}
                        {colourise(ability, 'ability')} check and rolled a{' '}
                        {colourise(roll, 'score')},
                        {colourise(' critical hit!', 'damage-to-monster')}
                    </p>
                ),
            });

            return newState;
        }

        case 'ABILITY_CHECK': {
            const { ability, entity, roll, check, against } = payload;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You performed {aOrAn(ability)}{' '}
                        {colourise(ability, 'ability')} check and rolled{' '}
                        {colourise(roll, 'score')}, which{' '}
                        {roll >= check ? 'succeeded' : 'failed'} against the{' '}
                        {colourise(against, 'ability')} value of{' '}
                        {colourise(check, 'score')} for the{' '}
                        {colourise(entity, 'type')}
                    </p>
                ),
            });

            return newState;
        }

        case 'HEAL_HP': {
            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You restored {colourise(payload, 'restore-health')}{' '}
                        health!
                    </p>
                ),
            });
            return newState;
        }

        case 'RESTORE_MANA': {
            if (payload.kind === 'passive') return state;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You restored {colourise(payload.amount, 'restore-mana')}{' '}
                        mana!
                    </p>
                ),
            });
            return newState;
        }

        case 'DAMAGE_TO_PLAYER': {
            const { entity, damage, kind, effect } = payload;
            newState = cloneDeep(state);

            if (kind === 'suicide') {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} committed suicide,
                            dealing {colourise(damage, 'damage-to-player')}{' '}
                            damage to you!
                        </p>
                    ),
                });
            } else if (effect !== undefined) {
                // The player was damaged by an effect applied to them
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            You took {colourise(damage, 'damage-to-player')}{' '}
                            damage from {colourise(effect, 'ai')}!
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry:
                        payload.damage === 0 ? (
                            <p key={uuidv4()}>
                                The {colourise(entity, 'type')} missed you!
                            </p>
                        ) : (
                            <p key={uuidv4()}>
                                The {colourise(entity, 'type')} dealt{' '}
                                {colourise(damage, 'damage-to-player')} damage
                                to you!
                            </p>
                        ),
                });
            }
            return newState;
        }

        case 'DAMAGE_TO_MONSTER': {
            const { entity, damage, from } = payload;

            newState = cloneDeep(state);

            if (from === 'player') {
                newState.entries.push({
                    key: uuidv4(),
                    entry:
                        damage === 0 ? (
                            <p key={uuidv4()}>
                                You missed the {colourise(entity, 'type')}!
                            </p>
                        ) : (
                            <p key={uuidv4()}>
                                You dealt{' '}
                                {colourise(damage, 'damage-to-monster')} damage
                                to the {colourise(entity, 'type')}!
                            </p>
                        ),
                });
            } else if (from === 'suicide') {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} killed itself!
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} took{' '}
                            {colourise(damage, 'damage-to-monster')} damage from
                            the {colourise(from, 'damage-type')}!
                        </p>
                    ),
                });
            }
            return newState;
        }

        case 'MONSTER_HEAL_HP': {
            const { entity, healAmount } = payload;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        The {colourise(entity, 'type')} healed{' '}
                        {colourise(healAmount, 'health-gain')} health!
                    </p>
                ),
            });
            return newState;
        }

        case 'MONSTER_DIED': {
            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You vanquished the {colourise(payload, 'type')}!
                    </p>
                ),
            });

            return newState;
        }

        case 'USE_PROJECTILE': {
            const { name, information } = payload.projectile;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You {information} {colourise(name, 'projectile')}
                    </p>
                ),
            });

            return newState;
        }

        case 'MONSTER_USE_PROJECTILE': {
            const { projectile, entity } = payload;
            const { name, information } = projectile;

            newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        The {colourise(entity, 'type')} {information}{' '}
                        {colourise(name, 'projectile')}
                    </p>
                ),
            });

            return newState;
        }

        case 'CAST_SPELL': {
            const { name } = payload.projectile;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You cast {colourise(name, 'spell-cast')}
                    </p>
                ),
            });
            return newState;
        }

        case 'MONSTER_CAST_SPELL': {
            const { entity, spell } = payload;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        The {colourise(entity, 'type')} cast{' '}
                        {colourise(spell.name, 'spell-cast')}!
                    </p>
                ),
            });

            return newState;
        }

        case 'EFFECT_PLAYER': {
            const { effect } = payload;
            newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>You were {colourise(effect, 'ai')}!</p>
                ),
            });

            return newState;
        }

        case 'CHANGE_AI': {
            const { from, ai, entity, original } = payload;

            newState = cloneDeep(state);

            if (from !== original && from !== ai) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} stopped being{' '}
                            {colourise(from, 'ai')}!
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, 'type')} was{' '}
                            {colourise(ai, 'ai')}!
                        </p>
                    ),
                });
            }

            return newState;
        }

        case 'GET_ITEM': {
            const { name } = payload;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You gained an item: {colourise(name, 'get-item')}
                    </p>
                ),
            });
            return newState;
        }

        case 'GET_EXP': {
            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You gained {colourise(payload, 'experience')}{' '}
                        experience!
                    </p>
                ),
            });

            return newState;
        }

        case 'GET_GOLD': {
            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You gained {colourise(payload, 'gold')} gold!
                    </p>
                ),
            });

            return newState;
        }

        case 'LEVEL_UP': {
            const { level, hp, mana } = payload;

            newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You reached level {colourise(level, 'level')}, gained{' '}
                        {colourise(hp, 'health-gain')} hp and{' '}
                        {colourise(mana, 'mana-gain')} mana!
                    </p>
                ),
            });

            if (isAbilityAllocationLevel(level)) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            You gained{' '}
                            {colourise(LEVEL_UP_ABILITY_POINTS, 'level')}{' '}
                            ability points!
                        </p>
                    ),
                });
            }

            const unlockedSpell = spells
                .filter(spell => spell.unlockLevel === level)
                .pop();

            if (unlockedSpell) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            You unlocked the{' '}
                            {colourise(unlockedSpell.name, 'level')} spell!
                        </p>
                    ),
                });
            }

            return newState;
        }

        case 'SET_JOURNAL_SCROLLING':
            newState = cloneDeep(state);
            newState.scroll = payload;
            return newState;

        case 'persist/REHYDRATE':
        case 'LOAD_DATA': {
            if (!(payload && payload.journal)) return initialState;

            newState = cloneDeep(payload.journal);
            newState.entries = newState.entries.map(({ key, entry }) => ({
                key,
                entry: (
                    <p key={entry.key}>
                        {entry.props.children.map(child => {
                            if (child.props) {
                                return colourise(
                                    child.props.children,
                                    child.props.className
                                );
                            } else {
                                return child;
                            }
                        })}
                    </p>
                ),
            }));
            return { ...initialState, ...newState };
        }

        case 'RESET':
            return { ...initialState };

        default:
            return state;
    }
};

export default journalReducer;
