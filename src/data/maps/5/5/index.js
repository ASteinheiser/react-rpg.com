const tiles = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5],
    [5, 0, 9, 0, 5, 5, 5, 6, 0, 0, 6, 0, 0, 0, 6, 0, 0, 6, 5, 5],
    [5, 0, 0, 0, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6],
    [5, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 6],
    [5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6],
    [5, 4, 2, 4, 5, 5, 5, 6, 0, 0, 6, 0, 0, 0, 6, 0, 0, 6, 5, 5],
    [5, 4, 0, 4, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5],
    [5, 4, 4, 4, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
]; //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9

const wallType = 'skull';

const monsters = [
    {
        type: 'rat',
        position: [8, 6],
    },
    {
        type: 'bat',
        position: [9, 4],
    },
    {
        type: 'snake',
        position: [9, 8],
    },
    {
        type: 'wolf',
        position: [10, 10],
    },
    {
        type: 'salamander',
        position: [10, 7],
    },
    {
        type: 'water spirit',
        position: [10, 5],
    },
    {
        type: 'goblin',
        position: [10, 2],
    },
    {
        type: 'gas cloud',
        position: [11, 3],
    },
    {
        type: 'fungi bulb',
        position: [11, 6],
    },
    {
        type: 'orc',
        position: [11, 9],
    },
    {
        type: 'ghost',
        position: [12, 8],
    },
    {
        type: 'stone golem',
        position: [12, 4],
    },
    {
        type: 'imp',
        position: [13, 2],
    },
    {
        type: 'poison cloud',
        position: [13, 6],
    },
    {
        type: 'fire spirit',
        position: [13, 10],
    },
    {
        type: 'warlock',
        position: [14, 6],
    },
    {
        type: 'black orc',
        position: [14, 4],
    },
    {
        type: 'medusa',
        position: [15, 3],
    },
    {
        type: 'plantera',
        position: [15, 9],
    },
    {
        type: 'pumpkin ghost',
        position: [16, 4],
    },
    {
        type: 'dragon',
        position: [16, 8],
    },
    {
        type: 'lich',
        position: [16, 6],
    },
    {
        type: 'cerberus',
        position: [17, 6],
    },
];

const stairs = {
    down: '5_4',
};

const message = {
    title:
        'The final batlle.  <> felt the magic sword resonating where it rested just beyond the final swarm of monsters.',
    body: `Every monster they had faced was here.  <> hadn't long to go now, one more battle and they would be triumphant.`,
};

export default {
    tiles,
    wallType,
    monsters,
    stairs,
    message,
};
