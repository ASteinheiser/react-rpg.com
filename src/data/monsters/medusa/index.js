import MedusaSprite from './medusa.png';
import MedusaFloppedSprite from './medusa-flopped.png';

const Medusa = {
    hp: 40,
    maxHp: 40,
    attackValue: '3d10 + 20',
    defence: 5,
    dice: '1d20 + 4',
    exp: 350,
    type: 'medusa',
    sprite: { WEST: MedusaSprite, EAST: MedusaFloppedSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Medusa;
