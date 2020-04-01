import { SPRITE_SIZE } from '../../../config/constants';

export default function closeChestDialog() {
    return (dispatch, getState) => {
        const { dialog, player } = getState();
        const { chestOpen } = dialog;
        const { position } = player;

        dispatch({
            type: 'SET_CHEST_DATA',
            payload: {
                gold: 0,
                exp: 0,
                item: chestOpen.item,
                x: position[0] / SPRITE_SIZE,
                y: position[1] / SPRITE_SIZE,
            },
        });
        dispatch({
            type: 'PAUSE',
            payload: { pause: false },
        });
    };
}
