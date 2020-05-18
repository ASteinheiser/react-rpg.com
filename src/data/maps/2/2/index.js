const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 0, 4, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 2, 0, 5],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 5, 5, 0, 4, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 5, 5, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 3, 0, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

const wallType = 'blue';

const monsters = [
    {
        type: 'ghost',
        position: [5, 5],
    },
    {
        type: 'orc',
        position: [8, 5],
    },
    {
        type: 'ghost',
        position: [7, 7],
    },
    {
        type: 'stone golem',
        position: [6, 9],
    },
];

const stairs = {
    down: '2_1',
    up: '2_3',
};

const message = {
    title:
        'Entering this part of the dungeon, <> noticed stray gold coins accompanied by large burn markings. The voice spoke.',
    body: `"EQUAL PARTS BEAUTIFUL AND DANGEROUS... THESE CREATURES ARE THE ESSENCE OF GREED."`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
