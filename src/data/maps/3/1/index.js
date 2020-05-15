const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 4, 0, 0, 0, 5],
    [5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 6, 0, 6, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 5],
    [5, 4, 0, 4, 5, 5, 0, 4, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5],
    [5, 6, 0, 6, 5, 5, 5, 5, 5, 5, 6, 0, 6, 5, 5, 5, 5, 0, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5],
    [5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 1],
    [5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 0, 0, 0, 2],
    [5, 5, 3, 5, 5, 5, 5, 5, 0, 5, 5, 4, 0, 0, 0, 0, 0, 5, 5, 1],
    [5, 5, 5, 5, 5, 4, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 4, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'purple';

const monsters = [
    {
        type: 'stone-golem',
        position: [17, 6],
    },
    {
        type: 'imp',
        position: [16, 14],
    },
    {
        type: 'imp',
        position: [11, 9],
    },
    {
        type: 'imp',
        position: [7, 3],
    },
];

const stairs = {
    down: '2_5',
    up: '3_2',
};

const message = {
    title:
        '<> prevailed over the Lich, but more adventure lay ahead with many more monsters to be slain.',
    body: `As <> delved deeper into the dungeon, the walls changed tone yet again. It was almost as if magic itself was imbued into the very stones`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
