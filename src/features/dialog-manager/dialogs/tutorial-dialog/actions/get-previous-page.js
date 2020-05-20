export default function getPreviousPage(page) {
    switch (page) {
        case 'movement':
            return null;
        case 'dice':
            return 'movement';
        case 'combat':
            return 'dice';
        case 'spell':
            return 'combat';
        case 'item':
            return 'spell';
        case 'shop':
            return 'item';
        case 'ability':
            return 'shop';
        case 'hotkey':
            return 'ability';
        default:
            return null;
    }
}
