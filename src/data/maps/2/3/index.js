const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 4, 0, 0, 0, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 4, 0, 5, 5, 5, 5, 5],
    [5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 6, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 6, 0, 5, 5, 5, 4, 0, 0, 5, 5],
    [5, 5, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 6, 0, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

const wallType = 'blue-pattern';

const monsters = [
    {
        type: 'stone golem',
        position: [12, 4],
    },
    {
        type: 'ghost',
        position: [13, 2],
    },
    {
        type: 'stone golem',
        position: [4, 7],
    },
    {
        type: 'orc',
        position: [4, 11],
    },
];

const stairs = {
    down: '2_2',
    up: '2_4',
};

const message = {
    title:
        '<> struggled up the stairs, overencumbered with all the loot and gold they had accumulated',
    body: `<> struggled on with grim determination, wishing they'd gotten more exercise...`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
