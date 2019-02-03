import React from 'react';

import { getTileSprite, FogTile } from './index.js';
import { SPRITE_SIZE }            from '../../config/constants';

import './styles.scss';

function BoundaryTile(props) {
  const { tileType, variation, explored, sightBox, location } = props;

  let inSight = false;
  if(sightBox) {
    // check the sight box tiles
    sightBox.forEach(sightBoxTile => {
      // if the current tile is in range
      if(JSON.stringify(sightBoxTile) === JSON.stringify(location)) {
        // remove the overlay
        return inSight = true;
      }
    });
  }

  return(
    <div style={{
      backgroundImage: `url(/tiles/${getTileSprite(tileType, variation)}.png)`,
      display: 'inline-flex',
      height: SPRITE_SIZE,
      width: SPRITE_SIZE
    }}>
      <FogTile explored={explored} inSight={inSight} />
    </div>
  );
}

export default function MapPadding(props) {
  const { tileType, tiles, sightBox } = props;

  const TilesTop = tiles.top.map((topRow, index) => {
    return (
      <div className='row' style={{ height: SPRITE_SIZE }} key={`top-row-${index}`}>
        {
          topRow.map(topRowTile => {
            return (
              <BoundaryTile
                tileType={tileType}
                variation={topRowTile.variation}
                explored={topRowTile.explored}
                sightBox={sightBox}
                location={topRowTile.location}
                key={JSON.stringify(topRowTile.location)} />
            );
          })
        }
      </div>
    );
  });
  // we need to mirrow the top rows for them to
  // render properly with the player's sightbox
  TilesTop.reverse();

  const TilesBottom = tiles.bottom.map((bottomRow, index) => {
    return (
      <div className='row' style={{ height: SPRITE_SIZE }} key={`bottom-row-${index}`}>
        {
          bottomRow.map(bottomRowTile => {
            return (
              <BoundaryTile
                tileType={tileType}
                variation={bottomRowTile.variation}
                explored={bottomRowTile.explored}
                sightBox={sightBox}
                location={bottomRowTile.location}
                key={JSON.stringify(bottomRowTile.location)} />
            );
          })
        }
      </div>
    );
  });

  return(
    <React.Fragment>
      <div className='map-padding-top'>
        { TilesTop }
      </div>
      <div className='map-padding-bottom'>
        { TilesBottom }
      </div>
      {/* <div className='map-padding-left'>
        { TilesLeft }
      </div>
      <div className='map-padding-right'>
        { TilesRight }
      </div> */}
    </React.Fragment>
  );
}