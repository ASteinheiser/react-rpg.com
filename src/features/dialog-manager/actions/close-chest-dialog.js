import { spriteToCoordinates } from '../../../config/constants';

export default function closeChestDialog() {
    return (dispatch, getState) => {
        const { dialog, player } = getState();
        const { chestOpen } = dialog;
        const { position } = player;

        const { x, y } = spriteToCoordinates(position);

        // Ensure that if any items are left in the chest, that stays in the chest
        dispatch({
            type: 'SET_CHEST_DATA',
            payload: {
                gold: 0,
                exp: 0,
                item: chestOpen.item,
                x: x,
                y: y,
            },
        });
        dispatch({
            type: 'PAUSE',
            payload: { pause: false },
        });
    };
}
