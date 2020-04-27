import cloneDeep from 'lodash.clonedeep';

const initialState = {
    entries: [],
};

const journalReducer = (state = initialState, { type, payload }) => {
    let newState;

    switch (type) {
        case 'MONSTER_ABILITY_CHECK':
            newState = cloneDeep(state);
            newState.entries.push(
                'The ' +
                    payload.type +
                    ' attacked you with an attack value of ' +
                    payload.attackValue +
                    ' against your defense value of ' +
                    payload.check
            );
            return newState;

        case 'ABILITY_CHECK':
            newState = cloneDeep(state);
            newState.entries.push(
                'You rolled a(n) ' +
                    payload.ability +
                    ' check and got ' +
                    payload.roll
            );

            newState.entries.push(
                'The ' +
                    payload.ability +
                    ' check ' +
                    (payload.roll >= payload.check ? 'succeeded' : 'failed') +
                    ' against ' +
                    payload.check
            );

            return newState;

        case 'DAMAGE_TO_PLAYER':
            newState = cloneDeep(state);
            newState.entries.push(
                payload.damage === 0
                    ? 'The ' + payload.type + ' missed you!'
                    : 'The ' +
                          payload.type +
                          ' dealt ' +
                          payload.damage +
                          ' damage to you!'
            );
            return newState;

        case 'DAMAGE_TO_MONSTER':
            newState = cloneDeep(state);
            newState.entries.push(
                payload.damage === 0
                    ? 'You missed the ' + payload.type + '!'
                    : 'You dealt ' +
                          payload.damage +
                          ' damage to the ' +
                          payload.type +
                          '!'
            );
            return newState;

        case 'CAST_SPELL':
            newState = cloneDeep(state);
            newState.entries.push('You cast ' + payload.spell.name);
            return newState;

        case 'LOAD_DATA':
            return { ...initialState, ...payload.journal };

        case 'RESET':
            return { ...initialState };

        default:
            return state;
    }
};

export default journalReducer;
