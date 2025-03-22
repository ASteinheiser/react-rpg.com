const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 4, 0, 5, 5, 5, 5, 5, 0, 3, 0, 5, 5, 5, 5, 5, 5, 0, 4, 5],
    [5, 0, 0, 0, 0, 5, 5, 6, 0, 0, 0, 6, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 6, 6, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 6, 6, 5],
    [5, 0, 5, 5, 0, 5, 5, 0, 6, 0, 6, 0, 5, 5, 5, 0, 5, 5, 0, 5],
    [5, 6, 5, 5, 0, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 0, 5, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [5, 6, 0, 0, 0, 5, 5, 0, 6, 0, 6, 0, 5, 5, 5, 0, 0, 0, 0, 0],
    [5, 0, 5, 5, 0, 5, 5, 0, 0, 6, 0, 0, 5, 5, 5, 0, 5, 5, 0, 5],
    [5, 0, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5],
    [5, 4, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 4, 5],
    [5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 5],
    [5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'inca-dark';

const monsters = [
    {
        type: 'poison cloud',
        position: [4, 4],
    },
    {
        type: 'warlock',
        position: [2, 7],
    },
    {
        type: 'medusa',
        position: [2, 11],
    },
    {
        type: 'medusa',
        position: [2, 1],
    },
    {
        type: 'poison cloud',
        position: [11, 6],
    },
    {
        type: 'black orc',
        position: [8, 6],
    },
    {
        type: 'dragon',
        position: [18, 11],
    },
    {
        type: 'stone golem',
        position: [15, 7],
    },
];

const stairs = {
    down: '4_5',
    up: '5_2',
};

const message = {
    title:
        '<> stumbled out of the forest and looked around in awe at their new surroundings.',
    body: `It seemed as if <> had stumbled across a lost world, with Inca designs etched into the stonework. Faces seemed to pop out at <> from all around.`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
