const tiles = [
    [5, 5, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 4, 0, 4, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 4, 0, 4, 5, 5, 5, 5, 0, 3, 0, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 5, 4, 0, 4, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 2, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 5, 5, 0, 6, 5, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 5, 5, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 6, 5, 5, 5, 0, 5],
    [5, 5, 5, 0, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 6, 5, 5, 0, 5],
    [5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

const wallType = 'blue-pattern';

const monsters = [
    {
        type: 'stone golem',
        position: [12, 12],
    },
    {
        type: 'imp',
        position: [11, 9],
    },
    {
        type: 'imp',
        position: [10, 11],
    },
];

const stairs = {
    down: '2_3',
    up: '2_5',
};

const message = {
    title:
        '<>  kneeled against the dungeon wall, ruffling through their spellbook.',
    body: `I'm sure there must be something here about teleporting out safely. What if I really need to go?`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
