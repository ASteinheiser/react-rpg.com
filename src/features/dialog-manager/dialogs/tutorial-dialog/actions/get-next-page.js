export default function getNextPage(page) {
    switch (page) {
        case 'movement':
            return 'dice';
        case 'dice':
            return 'combat';
        case 'combat':
            return 'spell';
        case 'spell':
            return 'item';
        case 'item':
            return 'shop';
        case 'shop':
            return 'ability';
        case 'ability':
            return 'hotkey';
        case 'hotkey':
            return null;
        default:
            return null;
    }
}
