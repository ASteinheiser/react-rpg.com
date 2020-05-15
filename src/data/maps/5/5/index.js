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
        position: [8, 4],
    },
    {
        type: 'bat',
        position: [8, 11],
    },
    {
        type: 'wolf',
        position: [10, 3],
    },
    {
        type: 'goblin',
        position: [10, 9],
    },
    {
        type: 'orc',
        position: [12, 4],
    },
    {
        type: 'ghost',
        position: [12, 11],
    },
    {
        type: 'stone-golem',
        position: [14, 3],
    },
    {
        type: 'warlock',
        position: [14, 9],
    },
    {
        type: 'imp',
        position: [16, 4],
    },
    {
        type: 'medusa',
        position: [16, 11],
    },
    {
        type: 'black-orc',
        position: [9, 6],
    },
    {
        type: 'dragon',
        position: [11, 6],
    },
    {
        type: 'lich',
        position: [13, 6],
    },
    {
        type: 'cerberus',
        position: [15, 6],
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
