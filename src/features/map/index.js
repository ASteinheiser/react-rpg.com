import React       from 'react';
import { connect } from 'react-redux';

import { SPRITE_SIZE } from '../../config/constants';

import './styles.css'

function getTileSprite(type) {
  switch(type) {
    case 0:
      return 'grass'
    case 5:
      return 'rock'
    case 6:
      return 'tree'
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
        props.tiles.map( tile => <MapTile tile={tile} /> )
      }
    </div>
  )
}

function Map(props) {
  const { map } = props;

  return (
    <div style={{
      width: '800px',
      height: '600px',
      border: '4px solid #000',
    }}>
      {
        map.tiles.map( row => <MapRow tiles={row} /> )
      }
    </div>
  );
}

const mapStateToProps = ({ map }) => {
  return { map };
}

export default connect(mapStateToProps)(Map);
