// Credit: https://kvsr.itch.io/pixelarteffectfx017
import MeteorSprite from './Meteor.png';
import MeteorImage from './Meteor-image.png';
import { SIGHT_RADIUS } from '../../../config/constants';

const Meteor = {
    name: 'Meteor',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '3d10',
    manaCost: 35,
    size: { width: 40, height: 40, total: 200 },
    image: MeteorImage,
    sprite: MeteorSprite,
    description:
        "Fireballs weren't destroying enough walls? Maybe this will suit your destruction needs.",
    unlockLevel: 17,
};

export default Meteor;
