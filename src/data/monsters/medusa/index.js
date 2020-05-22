// Credit: https://mobilegamegraphics.itch.io/adventure-game-kit
import MedusaSprite from './medusa.png';
import MedusaFloppedSprite from './medusa-flopped.png';

const Medusa = {
    hp: 40,
    maxHp: 40,
    attackValue: '5d6 + 25',
    defence: 5,
    dice: '1d20 + 4',
    exp: 350,
    type: 'medusa',
    sprite: { WEST: MedusaFloppedSprite, EAST: MedusaSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Medusa;
