// Credit: https://untiedgames.itch.io/five-free-pixel-explosions
import HealSprite from './Heal.png';
// Crefit: https://adwitr.itch.io/pixel-health-bar-asset-pack-2
import HealImage from './Heal-image.png';

const Heal = {
    name: 'Heal',
    type: 'spell',
    target: 'self::heal',
    kind: 'assist',
    range: 0,
    damage: '2d6',
    manaCost: 30,
    size: { width: 40, height: 40, total: 2480 },
    image: HealImage,
    sprite: HealSprite,
    description: 'Aww, did they hurt you?',
    unlockLevel: 15,
};

export default Heal;
