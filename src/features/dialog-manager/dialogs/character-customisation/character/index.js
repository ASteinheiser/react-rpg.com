import React from 'react';

import PlayerHair from './assets/player-hair-big.png';
import PlayerEyes from './assets/player-eyes-big.png';
import PlayerArmour from './assets/player-armour-big.png';
import PlayerClothes from './assets/player-clothes-big.png';
import PlayerSkin from './assets/player-skin-big.png';
import PlayerOutline from './assets/player-outline-big.png';

import './styles.scss';

const Character = ({
    hairColour,
    eyeColour,
    skinColour,
    armourColour,
    clothesColour,
}) => {
    const SPRITE_HEIGHT = 200;

    return (
        <div className="flex-column character-customisation__sprite-container">
            <img
                className="character-customisation__hair"
                src={PlayerHair}
                alt="hair"
                height={SPRITE_HEIGHT}
                style={{ filter: `hue-rotate(${hairColour - 10}deg)` }}
            />
            <img
                className="character-customisation__eyes"
                src={PlayerEyes}
                alt="eyes"
                height={SPRITE_HEIGHT}
            />
            <img
                className="character-customisation__skin"
                src={PlayerSkin}
                alt="skin"
                height={SPRITE_HEIGHT}
                style={{ filter: `hue-rotate(${skinColour - 10}deg)` }}
            />
            <img
                className="character-customisation__armour"
                src={PlayerArmour}
                alt="armour"
                height={SPRITE_HEIGHT}
                style={{ filter: `hue-rotate(${armourColour - 10}deg)` }}
            />
            <img
                className="character-customisation__clothes"
                src={PlayerClothes}
                alt="clothes"
                height={SPRITE_HEIGHT}
                style={{ filter: `hue-rotate(${clothesColour - 10}deg)` }}
            />
            <img
                className="character-customisation__outline"
                src={PlayerOutline}
                alt="outline"
                height={SPRITE_HEIGHT}
            />
        </div>
    );
};

export default Character;
