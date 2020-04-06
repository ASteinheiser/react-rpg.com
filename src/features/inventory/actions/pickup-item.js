import { spriteToCoordinates } from '../../../utils/sprite-to-coordinates';

export default function pickupItem() {
    return (dispatch, getState) => {
        const { inventory, dialog, player, stats } = getState();

        const { gold, exp, item } = dialog.chestOpen;

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
                    },
                });
            }
        }

        if (!item) return;

        const { items, maxItems } = inventory;
        const { x, y } = spriteToCoordinates(player.position);

        if (items.length < maxItems) {
            // The item has now been taken, so make sure it gets deleted
            dispatch({
                type: 'SET_CHEST_DATA',
                payload: {
                    exp: 0,
                    gold: 0,
                    item: null,
                    x: x,
                    y: y,
                },
            });
            dispatch({
                type: 'GET_ITEM',
                payload: item,
            });
        } else {
            // The item now needs to stay in the chest, so put it there
            dispatch({
                type: 'SET_CHEST_DATA',
                payload: {
                    exp: 0,
                    gold: 0,
                    item: item,
                    x: x,
                    y: y,
                },
            });
            dispatch({
                type: 'TOO_MANY_ITEMS',
                payload: item,
            });
        }
    };
}
