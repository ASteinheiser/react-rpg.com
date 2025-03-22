export default function getNextPage(page) {
    switch (page) {
        case 'movement':
            return 'ability';
        case 'ability':
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
            return 'hotkey';
        case 'hotkey':
            return null;
        default:
            return null;
    }
}
