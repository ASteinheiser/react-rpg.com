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
    damage: '2d8 + 4',
    manaCost: 73,
    size: { width: 40, height: 40, total: 200 },
    image: MeteorImage,
    sprite: MeteorSprite,
    description:
        "Fireballs weren't destroying enough walls? Maybe this will suit your destruction needs.",
    unlockLevel: 25,
};

export default Meteor;
