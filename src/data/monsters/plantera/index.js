import PlanteraSprite from './plantera.png';

const Plantera = {
    hp: 40,
    maxHp: 40,
    attackValue: 36,
    defence: 4,
    dice: '3d8+2',
    exp: 330,
    type: 'Plantera',
    sprite: PlanteraSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Plantera;
