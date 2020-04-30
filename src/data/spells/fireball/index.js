// Credit: https://kvsr.itch.io/pixelarteffectfx017
import FireballSprite from './Fireball.png';
import FireballImage from './Fireball-image.png';

const Fireball = {
    name: 'Fireball',
    type: 'spell',
    target: 'enemy',
    range: 4,
    damage: '2d8',
    manaCost: 5,
    size: { width: 40, height: 40, total: 200 },
    image: FireballImage,
    sprite: FireballSprite,
    value: 10,
    description: 'Throw a ball of fire at the enemy (or a wall, your choice)',
};

export default Fireball;
