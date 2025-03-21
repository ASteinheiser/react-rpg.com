const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 0, 3, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5],
    [5, 6, 0, 6, 5, 5, 5, 0, 6, 0, 6, 0, 5, 5, 5, 5, 6, 0, 6, 5],
    [5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 0, 4, 0, 5, 5, 5, 0, 0, 4, 0, 0, 5, 5, 5, 5, 0, 4, 0, 5],
    [5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 6, 0, 6, 5, 5, 5, 0, 6, 0, 6, 0, 5, 5, 5, 5, 6, 0, 6, 5],
    [5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 0, 2, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'purple-brick';
const monsters = [
    {
        type: 'plantera',
        position: [1, 6],
    },
    {
        type: 'fire spirit',
        position: [3, 6],
    },
    {
        type: 'imp',
        position: [8, 6],
    },
    {
        type: 'black orc',
        position: [10, 6],
    },
    {
        type: 'warlock',
        position: [16, 6],
    },
    {
        type: 'poison cloud',
        position: [18, 6],
    },
];

const stairs = {
    down: '3_2',
    up: '3_4',
};

const message = {
    title: '<> stared down the crossroads wondering which way to go.',
    body:
        'The warm air touched their skin and <> smiles.  Adventure and treasure will face them no matter which direction they trek.',
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
