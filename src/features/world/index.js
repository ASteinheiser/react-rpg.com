import React       from 'react';
import { connect } from 'react-redux';

import Map    from '../map';
import Player from '../player';

import maps  from '../../data/maps';
import store from '../../config/store';

function World(props) {
  const { world } = props;
  // set map tiles for current map
  store.dispatch({
    type: 'ADD_TILES',
    payload: { tiles: maps[world.currentMap] }
  })

  return (
    <div style={{
      position: 'relative',
      width: '800px',
      height: '600px',
      margin: '25px auto',
    }}>
      <Map />
      <Player />
    </div>
  );
}

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(World);
