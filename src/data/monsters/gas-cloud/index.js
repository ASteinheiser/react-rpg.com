import GasCloudSprite from './gas-cloud.png';

const GasCloud = {
    hp: 10,
    maxHp: 10,
    attackValue: '2d10 + 5',
    defence: 1,
    dice: '1d4',
    exp: 35,
    type: 'gas cloud',
    sprite: GasCloudSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default GasCloud;
