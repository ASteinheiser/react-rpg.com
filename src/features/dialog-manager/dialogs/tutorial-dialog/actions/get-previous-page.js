export default function getPreviousPage(page) {
    switch (page) {
        case 'movement':
            return null;
        case 'combat':
            return 'movement';
        case 'spell':
            return 'combat';
        case 'item':
            return 'spell';
        case 'ability':
            return 'item';
        case 'hotkey':
            return 'ability';
        default:
            return null;
    }
}
