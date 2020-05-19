// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import SlingshotImg from './slingshot.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';
import Stone from '../../../../ammo/stone';

const Slingshot = {
    name: 'Slingshot',
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '1d8 + 2',
    image: SlingshotImg,
    projectile: Stone,
    value: 110,
};

export default Slingshot;
