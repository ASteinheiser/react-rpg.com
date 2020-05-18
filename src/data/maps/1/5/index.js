const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [6, 0, 6, 5, 5, 5, 5, 5, 5, 6, 0, 6, 5, 5, 5, 5, 5, 6, 0, 6],
    [0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0],
    [5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5],
    [0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0],
    [0, 4, 0, 5, 5, 5, 5, 5, 5, 0, 4, 0, 5, 5, 5, 5, 5, 0, 3, 0],
];

const wallType = 'ornate';

const monsters = [
    {
        type: 'water spirit',
        position: [1, 9],
    },
    {
        type: 'water spirit',
        position: [10, 9],
    },
    {
        type: 'goblin',
        position: [18, 9],
    },
];

const stairs = {
    down: '1_4',
    up: '2_1',
};

const message = {
    title: `<> hadn't eaten or slept since before entering the dungeon.  Their stomach grumbled, but <> passed it off as the sound of monsters.`,
    body: `<> blinked against the fatigue and pushed on.  "Sleep when you're dead."`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
