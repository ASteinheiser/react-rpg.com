// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import SlingshotImg from './slingshot.png';
import StoneImg from './stone.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';

const Slingshot = {
    name: 'Slingshot',
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '2d8',
    image: SlingshotImg,
    projectile: {
        name: 'stone',
        target: 'enemy',
        size: { width: 40, height: 40, total: 560 },
        sprite: StoneImg,
        information: 'flung a',
    },
    value: 110,
};

export default Slingshot;
