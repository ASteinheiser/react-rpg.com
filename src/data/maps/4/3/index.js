const tiles = [
    [5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 5],
    [9, 5, 0, 0, 5, 0, 0, 5, 0, 5, 5, 0, 5, 0, 0, 5, 5, 0, 5, 5],
    [0, 5, 5, 0, 0, 0, 5, 5, 3, 5, 0, 0, 5, 5, 0, 5, 0, 0, 0, 5],
    [0, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 3, 0, 5],
    [5, 0, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 0, 5, 4, 5, 5, 5, 5],
    [5, 0, 5, 5, 5, 5, 0, 5, 0, 0, 3, 5, 0, 0, 0, 0, 0, 0, 5, 5],
    [5, 0, 0, 5, 3, 5, 0, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5],
    [5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5],
    [4, 5, 0, 5, 5, 5, 5, 0, 5, 5, 4, 0, 0, 0, 5, 5, 5, 2, 0, 0],
    [0, 0, 0, 5, 0, 5, 0, 0, 3, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0],
    [5, 5, 5, 5, 0, 0, 0, 5, 5, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 3, 5, 5],
    [5, 4, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 3, 5, 5, 5, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'green-brick';

const monsters = [
    {
        type: 'pumpkin ghost',
        position: [15, 11],
    },
    {
        type: 'black orc',
        position: [12, 4],
    },
    {
        type: 'medusa',
        position: [13, 2],
    },
    {
        type: 'black orc',
        position: [4, 7],
    },
    {
        type: 'warlock',
        position: [4, 11],
    },
];

const stairs = {
    down: '4_2',
    up: '4_4',
};

const message = {
    title:
        'Startled, <> found out what the green light shining through the cracks was from.',
    body: `The jungle was intruding through the walls, the vines and moss making their home in the monster-filled dungeon.`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
