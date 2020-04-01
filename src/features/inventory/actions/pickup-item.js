import { SPRITE_SIZE } from '../../../config/constants';

export default function pickupItem() {
    return (dispatch, getState) => {
        const { inventory, dialog, player } = getState();

        const { item } = dialog.chestOpen;

        if (!item) return;

        const { position } = player;

        const { items, maxItems } = inventory;

        if (items.length < maxItems) {
            dispatch({
                type: 'SET_CHEST_DATA',
                payload: {
                    exp: 0,
                    gold: 0,
                    item: null,
                    x: position[0] / SPRITE_SIZE,
                    y: position[1] / SPRITE_SIZE,
                },
            });
            dispatch({
                type: 'GET_ITEM',
                payload: item,
            });
        } else {
            dispatch({
                type: 'SET_CHEST_DATA',
                payload: { exp: 0, gold: 0, item: item },
            });
            dispatch({
                type: 'TOO_MANY_ITEMS',
                payload: item,
            });
        }
    };
}
