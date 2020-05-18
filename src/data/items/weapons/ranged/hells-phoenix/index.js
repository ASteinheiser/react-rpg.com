// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import BowImg from './bow.png';
import ArrowImg from './arrow.png';
import { SIGHT_RADIUS } from '../../../../../config/constants';

const HellsPhoenix = {
    name: "Hell's Pheonix",
    type: 'weapon',
    kind: 'ranged',
    effect: {},
    range: SIGHT_RADIUS,
    damage: '2d8',
    image: BowImg,
    projectile: {
        name: 'arrow',
        target: 'enemy',
        size: { width: 40, height: 40, total: 560 },
        sprite: ArrowImg,
        information: 'fired an',
    },
    value: 110,
};

export default HellsPhoenix;
