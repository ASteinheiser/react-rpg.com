import React       from 'react';
import { connect } from 'react-redux';

import Map    from '../map';
import Player from '../player';

import tiles from '../../data/maps/00001';

function World(props) {
  const { world } = props;

  return (
    <div style={{
      position: 'relative',
      width: '800px',
      height: '600px',
      margin: '25px auto',
    }}>
      <Map map={{tiles}} />
      <Player />
    </div>
  );
}

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(World);
