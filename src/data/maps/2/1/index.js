const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 4, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 3, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 4, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 9, 6, 5, 5, 5, 0, 2, 0],
];

const wallType = 'blue';

const monsters = [
    {
        type: 'fungi bulb',
        position: [4, 5],
    },
    {
        type: 'gas cloud',
        position: [5, 7],
    },
    {
        type: 'gas cloud',
        position: [5, 11],
    },
    {
        type: 'fungi bulb',
        position: [3, 8],
    },
];

const stairs = {
    down: '1_5',
    up: '2_2',
};

const message = {
    title:
        '<> noticed the walls were now a vibrant blue. But before they could do anything, a deep voice was heard from every direction.',
    body: `"AS LONG AS OUR SPIRITS RESIDE IN THESE WALLS, THE OLD SWORD REMAINS OUR PRISONER..."`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
