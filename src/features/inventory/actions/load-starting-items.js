import items from '../../../data/items';

export default function loadStartingItems() {
    return (dispatch, getState) => {
        const { characterRace, characterClass } = getState().dialog.character;
        let weapon = null;
        switch (characterClass) {
            case 'Fighter':
                weapon = items.weapons.swords.RustySword;
                break;
            case 'Wizard':
                weapon = items.weapons.staffs.BlackStaff;
                break;
            case 'Ranger':
                weapon = items.weapons.ranged.Boomerang;
                break;
            default:
                weapon = items.weapons.swords.RustySword;
                break;
        }

        let startingItem = null;
        let dispatchType = null;
        switch (characterRace) {
            case 'Human':
                dispatchType = 'STARTING_ITEM';
                startingItem = items.clothes.armor.leather.LeatherBoots;
                break;
            case 'Elf':
                dispatchType = 'STARTING_ITEM';
                startingItem = items.clothes.armor.leather.LeatherGloves;
                break;
            case 'Dwarf':
            default:
                dispatchType = 'GET_GOLD';
                startingItem = 30;
                break;
        }

        dispatch({
            type: 'STARTING_ITEM',
            payload: weapon,
        });

        dispatch({
            type: dispatchType,
            payload: startingItem,
        });

        dispatch({
            type: 'EQUIP_ITEM',
            payload: getState().inventory.items[0],
        });

        dispatchType === 'STARTING_ITEM' &&
            dispatch({
                type: 'EQUIP_ITEM',
                payload: getState().inventory.items[1],
            });
    };
}
