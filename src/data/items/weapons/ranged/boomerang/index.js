// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import BoomerangImg from './boomerang.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';
import BoomerangAmmo from '../../../../ammo/boomerang';

const Boomerang = {
    name: 'Boomerang',
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '1d4 + 2',
    image: BoomerangImg,
    projectile: BoomerangAmmo,
    value: 35,
};

export default Boomerang;
