const tiles = [
    [5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5],
    [5, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5],
    [5, 0, 5, 0, 5, 5, 0, 0, 2, 5, 0, 0, 0, 0, 0, 0, 5, 5, 4, 5],
    [5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5],
    [5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 5, 5, 0, 0, 2, 5, 5],
    [5, 0, 5, 5, 5, 4, 5, 5, 5, 0, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5],
    [5, 0, 3, 5, 5, 5, 5, 5, 5, 0, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 2, 5, 5, 4, 2, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5],
    [0, 0, 0, 5, 0, 5, 5, 4, 4, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5],
    [5, 5, 0, 5, 5, 0, 0, 0, 2, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5],
    [0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 0, 0, 0, 5],
    [0, 5, 5, 0, 0, 0, 5, 4, 5, 5, 0, 0, 0, 5, 0, 4, 5, 5, 0, 5],
    [0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 2, 0, 5],
    [5, 5, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 0, 0, 2, 5, 5, 5, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'green-brick';

const monsters = [
    {
        type: 'black-orc',
        position: [1, 4],
    },
    {
        type: 'black-orc',
        position: [11, 7],
    },
    {
        type: 'medusa',
        position: [0, 8],
    },
    {
        type: 'black-orc',
        position: [7, 4],
    },
];

const stairs = {
    down: '4_3',
    up: '4_5',
};

const message = {
    title:
        '<> looked down a path that looked strangely familiar. Many people had gotten lost in the jungle before.',
    body: `'Let's just hope I don't get lost in here,' <> thought, wishing they'd brought some breadcrumbs.`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
