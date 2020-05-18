const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 0, 4, 0, 5, 5, 5, 5, 5, 0, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 6, 0, 6, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 2, 0, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
    [5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0],
    [5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 4, 0, 0, 0, 0, 0, 0, 5, 9],
    [5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];

const wallType = 'ornate';

const monsters = [
    {
        type: 'salamander',
        position: [15, 10],
    },
    {
        type: 'wolf',
        position: [12, 11],
    },
    {
        type: 'salamander',
        position: [14, 12],
    },
    {
        type: 'goblin',
        position: [2, 2],
    },
];

const stairs = {
    down: '1_3',
    up: '1_5',
};

const message = {
    title: `<> thought back to all the monsters they've slain.`,
    body: `'I hope someone else is cleaning up the blood, cause I'm not getting paid enough to do that...'`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
