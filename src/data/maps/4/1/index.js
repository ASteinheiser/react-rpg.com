const tiles = [
    [0, 0, 6, 5, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 0, 5, 0, 9, 0, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 5, 5, 0, 0, 0, 2, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
    [6, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 6, 5, 0, 0, 0, 0, 5, 0, 5],
    [0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 5],
    [0, 0, 5, 6, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 5],
    [5, 0, 0, 5, 0, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 4, 5, 0, 0, 0, 5, 0, 0, 0, 5],
    [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 5, 5, 0, 5],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 5, 4, 5],
    [0, 0, 0, 5, 6, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5],
    [5, 0, 5, 0, 5, 0, 0, 5, 5, 0, 0, 4, 5, 0, 0, 0, 0, 0, 5, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 4, 5, 0, 0, 5, 0, 0, 0, 5],
    [6, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5],
    [5, 5, 0, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5],
]; //0, 1, 2, 3, 4, 0, 6, 7, 8, 9, 0, 1, 2, 3, 4, 0, 6, 7, 8, 9
const wallType = 'green-cracks';

const monsters = [
    {
        type: 'medusa',
        position: [14, 5],
    },
    {
        type: 'black-orc',
        position: [14, 13],
    },
    {
        type: 'black-orc',
        position: [4, 2],
    },
    {
        type: 'warlock',
        position: [4, 7],
    },
    {
        type: 'medusa',
        position: [6, 5],
    },
    {
        type: 'medusa',
        position: [9, 12],
    },
];

const stairs = {
    down: '3_5',
    up: '4_2',
};

const message = {
    title:
        'The walls become cracked and <> frowned at the green light pouring out from between the cracks.',
    body: `'What was the dungeon changing into?', <> wondered.`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
