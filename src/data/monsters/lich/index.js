import LichSprite from './lich.png';
import LichFloppedSprite from './lich-flopped.png';

const Lich = {
    hp: 100,
    maxHp: 100,
    attackValue: '3d20 + 10',
    defence: 12,
    dice: '1d20 + 10',
    exp: 1000,
    type: 'lich',
    sprite: { WEST: LichSprite, EAST: LichFloppedSprite },
    ai: 'boss',
    originalAI: 'boss',
    direction: 'WEST',
    aiTurns: 0,
};

export default Lich;
