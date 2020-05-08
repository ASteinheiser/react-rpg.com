const tiles = [
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 4, 0, 0, 0, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 20, 0, 0, 0, 0, 0, 20, 7, 7, 7, 7],
    [7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 7, 7],
    [7, 7, 7, 7, 0, 7, 7, 7, 7, 20, 0, 0, 0, 0, 0, 20, 7, 7, 7, 7],
    [7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 0, 0, 0, 4, 0, 7, 7, 7, 7, 7],
    [7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 20, 0, 20, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 0, 7, 7, 7, 7, 0, 20, 0, 7, 7, 7, 4, 0, 0, 7, 7],
    [7, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 20, 0, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
];

const monsters = [
    {
        type: 'medusa',
        position: [12, 4],
    },
    {
        type: 'medusa',
        position: [13, 2],
    },
    {
        type: 'warlock',
        position: [4, 7],
    },
    {
        type: 'warlock',
        position: [4, 11],
    },
];

const stairs = {
    down: '2_2',
    up: '2_4',
};

const message = {
    title:
        'Entering this part of the dungeon, <> notices stray gold coins accompanied by large burn markings. The voice speaks.',
    body: `"EQUAL PARTS BEAUTIFUL AND DANGEROUS... THESE CREATURES ARE THE ESSENCE OF GREED."`,
};

export default {
    tiles,
    monsters,
    stairs,
    message,
};
