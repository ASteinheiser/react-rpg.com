// Credit: Made on www.pixelart.com by Kelvin Ngor
import WolfSprite from './wolf.png';
import WolfFloppedSprite from './wolf-flopped.png';

const Wolf = {
    hp: 10,
    maxHp: 10,
    attackValue: '2d4 + 3',
    defence: 1,
    dice: '1d4 + 1',
    exp: 22,
    type: 'wolf',
    sprite: { WEST: WolfSprite, EAST: WolfFloppedSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Wolf;
