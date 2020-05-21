export default function consumePotion(item, amount) {
    return dispatch => {
        if (item.kind === 'health') {
            dispatch({
                type: 'HEAL_HP',
                payload: Math.min(item.amount, amount),
            });
        } else if (item.kind === 'mana') {
            dispatch({
                type: 'RESTORE_MANA',
                payload: {
                    kind: 'potion',
                    amount: Math.min(item.amount, amount),
                },
            });
        }

        dispatch({
            type: 'USE_ITEM',
            payload: item,
        });
    };
}
