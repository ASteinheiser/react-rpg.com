// Credit: https://kvsr.itch.io/pixelarteffectfx017
import FireballSprite from './Fireball.png';
import FireballImage from './Fireball-image.png';
import { SIGHT_RADIUS } from '../../../config/constants';

const Fireball = {
    name: 'Fireball',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d8',
    manaCost: 5,
    size: { width: 40, height: 40, total: 200 },
    image: FireballImage,
    sprite: FireballSprite,
    description: 'Throw a ball of fire at the enemy (or a wall, your choice)',
};

export default Fireball;
