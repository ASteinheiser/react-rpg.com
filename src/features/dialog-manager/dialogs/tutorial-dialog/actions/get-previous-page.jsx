export default function getPreviousPage(page) {
    switch (page) {
        case 'movement':
            return null;
        case 'ability':
            return 'movement';
        case 'dice':
            return 'ability';
        case 'combat':
            return 'dice';
        case 'spell':
            return 'combat';
        case 'item':
            return 'spell';
        case 'shop':
            return 'item';
        case 'hotkey':
            return 'shop';
        default:
            return null;
    }
}
