// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import BoomerangImg from './boomerang.png';
import BoomerangAnimated from './boomerang-animated.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';

const Boomerang = {
    name: 'Boomerang',
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '1d4 + 2',
    image: BoomerangImg,
    projectile: {
        name: 'boomerang',
        target: 'enemy',
        size: { width: 40, height: 40, total: 560 },
        sprite: BoomerangAnimated,
        information: 'threw a',
    },
    value: 10,
};

export default Boomerang;
