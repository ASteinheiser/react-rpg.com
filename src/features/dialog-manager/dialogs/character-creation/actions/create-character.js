export default function createCharacter(characterName) {
    return (dispatch, getState) => {
        const { characterRace, characterClass } = getState().dialog.character;

        dispatch({
            type: 'CREATE_CHARACTER',
            payload: {
                characterName: characterName,
                characterRace: characterRace,
                characterClass: characterClass,
            },
        });

        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                abilityDialog: true,
            },
        });
    };
}
