import React from 'react';

import { getTileSprite, FogTile } from './map-tile';
import { SPRITE_SIZE } from '../../config/constants';

import './styles.scss';

const MapPadding = ({ tileType, wallType, tiles, sightBox }) => {
    const PaddingTiles = {};

    Object.keys(tiles).forEach(direction => {
        PaddingTiles[direction] = tiles[direction].map((row, index) => {
            return (
                <div
                    className="row"
                    style={{ height: SPRITE_SIZE }}
                    key={`${direction}-${index}`}
                >
                    {row.map(rowTile => {
                        return (
                            <BoundaryTile
                                tileType={tileType}
                                wallType={wallType}
                                variation={rowTile.variation}
                                explored={rowTile.explored}
                                sightBox={sightBox}
                                location={rowTile.location}
                                key={JSON.stringify(rowTile.location)}
                            />
                        );
                    })}
                </div>
            );
        });
    });

    // we need to mirrow the top rows for them to
    // render properly with the player's sightbox
    PaddingTiles.top.reverse();

    return (
        <>
            <div className="map__padding--top">{PaddingTiles.top}</div>
            <div className="map__padding--bottom">{PaddingTiles.bottom}</div>
            <div className="map__padding--left">{PaddingTiles.left}</div>
            <div className="map__padding--right">{PaddingTiles.right}</div>
        </>
    );
};

const BoundaryTile = ({
    tileType,
    wallType,
    variation,
    explored,
    sightBox,
    location,
}) => {
    let inSight = false;
    // Load the tile directly from the public folder
    let tilesrc = `${process.env.PUBLIC_URL}/tiles/${getTileSprite(
        tileType,
        variation,
        wallType
    )}.png`;

    if (sightBox) {
        // check the sight box tiles
        sightBox.forEach(sightBoxTile => {
            // if the current tile is in range
            if (JSON.stringify(sightBoxTile) === JSON.stringify(location)) {
                // remove the overlay
                return (inSight = true);
            }
        });
    }

    return (
        <div
            style={{
                backgroundImage: `url(${tilesrc})`,
                display: 'inline-flex',
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
            }}
        >
            <FogTile explored={explored} inSight={inSight} />
        </div>
    );
};

export default MapPadding;
