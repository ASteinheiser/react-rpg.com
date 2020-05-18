import PoisonCloudSprite from './poison-cloud.png';

const PoisonCloud = {
    hp: 30,
    maxHp: 30,
    attackValue: 30,
    defence: 2,
    dice: '3d4+2',
    exp: 230,
    type: 'poison cloud',
    sprite: PoisonCloudSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default PoisonCloud;
