import React from 'react';

import Flame from '../../components/flame';
import { SPRITE_SIZE } from '../../config/constants';

const MapTile = ({ tile, index, sightBox }) => {
    let inSight = false;
    // Load the tile directly from the public folder
    let tilesrc = `${process.env.PUBLIC_URL}/tiles/${getTileSprite(
        tile.value,
        tile.variation
    )}.png`;
    // if you need to render the sightBox
    if (sightBox) {
        // check the sight box tiles
        sightBox.forEach(sightValue => {
            // if the current tile is in range
            if (JSON.stringify(sightValue) === JSON.stringify(index)) {
                // remove the overlay
                return (inSight = true);
            }
        });
    }
    // case for rendering animated flame tile
    if (tile.value === 20) {
        return (
            <GroundTile variation={tile.variation}>
                <Flame position={index}>
                    <FogTile explored={tile.explored} inSight={inSight} />
                </Flame>
            </GroundTile>
        );
    }
    // case for rendering normal tiles
    return (
        <GroundTile variation={tile.variation}>
            <div
                style={{
                    backgroundImage: `url(${tilesrc}`,
                    height: SPRITE_SIZE,
                    width: SPRITE_SIZE,
                }}
            >
                <FogTile explored={tile.explored} inSight={inSight} />
            </div>
        </GroundTile>
    );
};

export function getTileSprite(type, variation) {
    switch (type) {
        case -2:
            return 'chest-open';
        case -1:
            return 'blood-splatter';
        case 0:
            return `ground-${variation}`;
        case 2:
            return 'stairs-down';
        case 3:
            return 'stairs-up';
        case 4:
            return 'chest';
        case 5:
            return `brick-wall-${variation}`;
        case 6:
            return `ornate-wall-${variation}`;
        case 7:
            return `blue-wall-${variation}`;
        case 8:
            return `skull-wall-${variation}`;
        case 9:
            return 'shop';
        case 10:
            return 'shrine';
        default:
    }
}

export const FogTile = ({ inSight, explored }) => {
    // show the tile by default
    let opacity = '0';
    // if the tile is out of sight, show faded
    if (!inSight) opacity = '0.5';
    // if the tile is unexplored, hide it
    if (!explored) opacity = '1';
    // render fog tiles
    return (
        <div
            style={{
                backgroundColor: '#000',
                opacity,
                display: 'inline-flex',
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
                transition: 'opacity .5s linear',
            }}
        />
    );
};

const GroundTile = ({ variation, children }) => {
    // Load the tile directly from the public folder
    let tilesrc = `${process.env.PUBLIC_URL}/tiles/ground-${variation}.png`;
    return (
        <div
            style={{
                backgroundImage: `url(${tilesrc})`,
                display: 'inline-flex',
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
            }}
        >
            {children}
        </div>
    );
};

export default MapTile;
