export default function exploreChest(x, y) {
    return (dispatch, getState) => {
        // replace the closed chest img with open
        const { world } = getState();
        const { chests } = world;

        if (x + ',' + y in chests) {
            dispatch({
                type: 'SET_CHEST_DATA',
                payload: {
                    gold: 0,
                    exp: 0,
                    item: chests[x + ',' + y].item,
                    x: x,
                    y: y,
                },
            });
        } else {
            dispatch({
                type: 'SET_CHEST_DATA',
                payload: false,
            });
        }
        dispatch({
            type: 'OPEN_CHEST',
            payload: { x, y },
        });
        // show the chest contents
        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                chest: true,
            },
        });
    };
}
