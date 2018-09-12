import React       from 'react';
import { connect } from 'react-redux';

import Map    from '../map';
import Player from '../player';

function World(props) {
  const { world } = props;

  return (
    <div style={{
        position: 'relative',
        width: '1024px',
        height: '576px',
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
