import MedusaSprite from './medusa.png';

const Medusa = {
    hp: 40,
    maxHp: 40,
    attackValue: '3d10 + 20',
    defence: 5,
    dice: '1d20 + 4',
    exp: 350,
    type: 'medusa',
    sprite: MedusaSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Medusa;
