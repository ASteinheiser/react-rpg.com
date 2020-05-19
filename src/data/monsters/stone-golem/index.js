import GolemSprite from './stone-golem.png';

const StoneGolem = {
    hp: 30,
    maxHp: 30,
    attackValue: '1d10 + 15',
    defence: 5,
    dice: '2d8 + 2',
    exp: 200,
    type: 'stone golem',
    sprite: { WEST: GolemSprite, EAST: GolemSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default StoneGolem;
