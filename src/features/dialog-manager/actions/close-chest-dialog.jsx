export default function closeChestDialog() {
    return (dispatch, getState) => {
        const { dialog, stats } = getState();
        const { gold, exp } = dialog.chestOpen;

        dispatch({
            type: 'PAUSE',
            payload: { pause: false },
        });

        if (gold > 0) {
            dispatch({
                type: 'GET_GOLD',
                payload: gold,
            });
        }

        if (exp > 0) {
            dispatch({
                type: 'GET_EXP',
                payload: exp,
            });

            if (exp + stats.exp >= stats.expToLevel) {
                dispatch({
                    type: 'PAUSE',
                    payload: {
                        pause: true,
                        levelUp: true,
                        chest: false,
                    },
                });
            }
        }
    };
}
