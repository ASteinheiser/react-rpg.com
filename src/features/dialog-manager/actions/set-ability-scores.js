export default function setAbilityScores() {
    return (dispatch, getState) => {
        const {
            constitution,
            charisma,
            dexterity,
            strength,
            wisdom,
            intelligence,
        } = getState().dialog.abilities;
        dispatch({
            type: 'SET_ABILITY_SCORES',
            payload: {
                abilities: {
                    charisma: charisma,
                    constitution: constitution,
                    dexterity: dexterity,
                    strength: strength,
                    wisdom: wisdom,
                    intelligence: intelligence,
                },
            },
        });
    };
}
