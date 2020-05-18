// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import CrossbowImg from './crossbow.png';
import BoltImg from './bolt.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';

const PhantasmCrossbow = {
    name: 'Phantasm Crossbow',
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '2d10 + 4',
    image: CrossbowImg,
    projectile: {
        name: 'bolt',
        target: 'enemy',
        size: { width: 40, height: 40, total: 560 },
        sprite: BoltImg,
        information: 'discharged a',
    },
    value: 300,
};

export default PhantasmCrossbow;
