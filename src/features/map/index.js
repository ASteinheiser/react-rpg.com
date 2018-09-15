import React       from 'react';
import { connect } from 'react-redux';

import { SPRITE_SIZE } from '../../config/constants';

function getTileSprite(type) {
  switch(type) {
    case -2:
      return 'chest-open'
    case -1:
      return 'blood-splatter'
    case 0:
      return 'ground'
    case 1:
      return 'stone-wall' // fake stone-wall obstacles
    case 2:
      return 'stairs-down'
    case 3:
      return 'stairs-up'
    case 4:
      return 'chest'
    case 5:
      return 'stone-wall'
    case 6:
      return 'cracked-wall'
    case 7:
      return 'skull-wall'
    case 8:
      return 'eye-wall'
    case 9:
      return 'shop'
    case 10:
      return 'shrine'
    default:
  }
}

function MapTile(props) {
  return (
    <div
      style={{
        backgroundImage: 'url(\'/tiles/ground.png\')',
        backgroundSize: 'contain',
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}>
      <div
        style={{
          backgroundImage: `url(/tiles/${getTileSprite(props.tile)}.png)`,
          backgroundSize: 'contain',
          height: SPRITE_SIZE,
          width: SPRITE_SIZE,
        }} />
    </div>
  );
}

function MapRow(props) {
  return (
    <div className="row"
      style={{
        height: SPRITE_SIZE,
      }}>
      {
        props.tiles.map((tile, index) => {
          return(
            <MapTile
              tile={tile}
              key={JSON.stringify(tile) + index} />
          );
        })
      }
    </div>
  )
}

function Map(props) {
  const { map } = props;

  return (
    <div style={{
      width: '800px',
      height: '600px'
    }}>
      {
        map.tiles.map((row, index) => {
          return (
            <MapRow
              tiles={row}
              key={JSON.stringify(row) + index} />
          );
        })
      }
    </div>
  );
}

const mapStateToProps = ({ map }) => {
  return { map };
}

export default connect(mapStateToProps)(Map);
