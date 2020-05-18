import GolemSprite from './stone-golem.png';

const StoneGolem = {
    hp: 30,
    maxHp: 30,
    attackValue: 24,
    defence: 5,
    dice: '2d8 + 2',
    exp: 200,
    type: 'stone golem',
    sprite: GolemSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default StoneGolem;
