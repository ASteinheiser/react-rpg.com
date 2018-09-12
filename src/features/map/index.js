import React       from 'react';
import { connect } from 'react-redux';

import { SPRITE_SIZE } from '../../config/constants';

import './styles.css';

function getTileSprite(type) {
  switch(type) {
    case 0:
      return 'grass'
    case 2:
      return 'rock' // fake rock obstacles
    case 3:
      return 'tree' // fake tree obstacles
    case 4:
      return 'chest'
    case 5:
      return 'rock'
    case 6:
      return 'tree'
    case 7:
      return 'arrow'
    default:
  }
}

function MapTile(props) {
  return <div
    className={`tile ${getTileSprite(props.tile)}`}
    style={{
      height: SPRITE_SIZE,
      width: SPRITE_SIZE,
    }}
  />
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
