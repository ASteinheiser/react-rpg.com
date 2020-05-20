// Credit: https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
import CrossbowImg from './crossbow.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';
import Bolt from '../../../../ammo/bolt';

const PhantasmCrossbow = {
    name: 'Phantasm Crossbow',
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '2d10 + 4',
    image: CrossbowImg,
    projectile: Bolt,
    value: 300,
};

export default PhantasmCrossbow;
