export default function setActiveSpell(spell) {
    return dispatch => {
        dispatch({ type: 'SET_ACTIVE_SPELL', payload: { spell } });
    };
}
