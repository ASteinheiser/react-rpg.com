export default function showEndlessMessage() {
    return dispatch => {
        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                gameText: {
                    title: `As <> stares into the dark dungeon, it greets them with a cold chill... and a message...`,
                    body: `"JOURNEY ONE HUNDRED FLOORS AND ALL WILL BE GRANTED"`,
                },
            },
        });
    };
}
