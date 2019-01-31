import React from 'react';

import { getTileSprite } from './index.js';
import { SPRITE_SIZE }   from '../../config/constants';

import './styles.scss';

let variation = [];
// generate static variations for the map padding tiles
// to avoid setting it during render and having the tiles
// variation swap with each player move
for(let i = 0; i < 125; i ++) {
  variation.push(Math.round(Math.random() * (4 - 1) + 1));
}

export default function MapPadding(props) {
  const { tile } = props;

  let TilesUpDown = [];
  for(let i = 0; i < 5; i ++) {
    let Row = [];
    for(let j = 0; j < 20; j ++) {
      Row.push(
        <div style={{
          backgroundImage: `url(/tiles/${getTileSprite(tile, variation[i + j])}.png)`,
          display: 'inline-flex',
          height: SPRITE_SIZE,
          width: SPRITE_SIZE
        }} />
      );
    }
    TilesUpDown.push(
      <div className='row' style={{ height: SPRITE_SIZE }}>
        { Row }
      </div>
    );
  }

  let TilesSide = [];
  for(let i = 0; i < 25; i ++) {
    let Row = [];
    for(let j = 0; j < 5; j ++) {
      Row.push(
        <div style={{
          backgroundImage: `url(/tiles/${getTileSprite(tile, variation[i + j])}.png)`,
          display: 'inline-flex',
          height: SPRITE_SIZE,
          width: SPRITE_SIZE
        }} />
      );
    }
    TilesSide.push(
      <div className='row' style={{ height: SPRITE_SIZE }}>
        { Row }
      </div>
    );
  }

  return(
    <React.Fragment>
      <div className='map-padding-top'>
        { TilesUpDown }
      </div>
      <div className='map-padding-bottom'>
        { TilesUpDown }
      </div>
      <div className='map-padding-left'>
        { TilesSide }
      </div>
      <div className='map-padding-right'>
        { TilesSide }
      </div>
    </React.Fragment>
  );
}