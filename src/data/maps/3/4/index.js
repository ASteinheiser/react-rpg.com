const tiles = [
    [0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5],
    [0, 4, 0, 5, 5, 5, 5, 5, 0, 2, 0, 5, 5, 5, 5, 5, 0, 4, 0, 5],
    [0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5],
    [5, 0, 5, 5, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5],
    [5, 0, 0, 0, 0, 6, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 5],
    [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 6, 0, 0, 0, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 0, 5],
    [5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5],
    [5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0],
    [5, 5, 0, 4, 0, 0, 0, 0, 6, 0, 5, 5, 0, 0, 0, 5, 5, 0, 4, 0],
    [5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 6, 0, 5, 5, 0, 0, 0],
    [5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0, 5],
    [0, 3, 0, 5, 5, 5, 0, 4, 0, 5, 5, 5, 5, 0, 0, 0, 0, 4, 0, 5],
    [0, 0, 0, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'purple-brick';

const monsters = [
    {
        type: 'warlock',
        position: [5, 7],
    },
    {
        type: 'warlock',
        position: [9, 11],
    },
    {
        type: 'medusa',
        position: [15, 5],
    },
    {
        type: 'medusa',
        position: [6, 12],
    },
];

const stairs = {
    down: '3_3',
    up: '3_5',
};

const message = {
    title:
        'As <> looked around, they notice the rooms appeared to be placed in a curious pattern.',
    body:
        'Up ahead, the shopkeeper tossed a coin and <> wondered how they could keep their business going unbothered by all the monsters',
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
