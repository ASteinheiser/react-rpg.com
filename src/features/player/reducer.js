import cloneDeep from 'lodash.clonedeep';

const initialState = {
    direction: 'SOUTH',
    position: [0, 0],
    playerMoved: false,
    playerAttacked: false,
    spellCast: false,
    monsterAttacked: false,
    playerDied: false,
    monsterDied: false,
    targetPosition: [],
    spell: null,
    turnsOutOfCombat: 0,
};

const playerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'MONSTER_DIED':
            // trigger monster's death sound
            return { ...state, monsterDied: !state.monsterDied };

        case 'PLAYER_DIED':
            // trigger player's death sound
            return { ...state, playerDied: !state.playerDied };

        case 'MONSTER_ATTACK':
            // trigger monster's attack animation on player
            return {
                ...state,
                monsterAttacked: !state.monsterAttacked,
                turnsOutOfCombat: 0,
            };

        case 'SET_ACTIVE_SPELL':
            return { ...state, spell: cloneDeep(payload.spell) };

        case 'CAST_SPELL':
            return {
                ...state,
                spellCast: !state.spellCast,
                targetPosition: payload ? payload.position : [],
                turnsOutOfCombat:
                    payload.spell.kind === 'combat'
                        ? 0
                        : state.turnsOutOfCombat,
            };

        case 'PLAYER_ATTACK':
            // trigger attack animation
            return {
                ...state,
                playerAttacked: !state.playerAttacked,
                turnsOutOfCombat: 0,
            };

        case 'MOVE_PLAYER':
            return {
                ...state,
                playerMoved: !state.playerMoved,
                ...payload,
            };

        case 'TAKE_TURN':
            return {
                ...state,
                turnsOutOfCombat: state.turnsOutOfCombat + 1,
            };

        case 'RESET':
            return initialState;

        case 'LOAD_DATA':
            return { ...initialState, ...payload.player };

        default:
            return state;
    }
};

export default playerReducer;
