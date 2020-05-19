const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 0, 5, 5, 0, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 4, 5, 5, 4, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5],
    [0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5],
    [0, 2, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 5, 5, 5, 0, 6, 5, 5, 6, 0, 5, 5, 0, 0, 3, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 5, 5, 0, 5, 5, 5, 0, 0, 5, 5, 0, 0, 5, 5, 0, 5, 5, 5, 5],
    [5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'green-cracks';

const monsters = [
    {
        type: 'black orc',
        position: [2, 5],
    },
    {
        type: 'black orc',
        position: [12, 8],
    },
    {
        type: 'pumpkin ghost',
        position: [7, 10],
    },
    {
        type: 'black orc',
        position: [15, 15],
    },
    {
        type: 'medusa',
        position: [12, 12],
    },
];

const stairs = {
    down: '4_1',
    up: '4_3',
};

const message = {
    title:
        '<> had delved deep into the dungeon, but still had not found the old sword they were here for.',
    body: `What was so special about a mystical talking sword anyway?`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
