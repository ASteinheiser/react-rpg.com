// Credit: https://untiedgames.itch.io/five-free-pixel-explosions
import MendSprite from './Mend.png';
// Crefit: https://adwitr.itch.io/pixel-health-bar-asset-pack-2
import MendImage from './Mend-image.png';

const Mend = {
    name: 'Mend',
    type: 'spell',
    target: 'self::heal',
    kind: 'assist',
    range: 0,
    damage: '1d6',
    manaCost: 3,
    size: { width: 40, height: 40, total: 2480 },
    image: MendImage,
    sprite: MendSprite,
    description: 'Mend the wounds you got fighting those big bad enemies',
};

export default Mend;
