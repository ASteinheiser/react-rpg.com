import React       from 'react';
import { connect } from 'react-redux';

import WalkSprite from './player_walk.png';

function Player(props) {
  const { player } = props;

  return (
    <div style={{
        position: 'absolute',
        top: player.position[1],
        left: player.position[0],
        backgroundImage: `url('${WalkSprite}')`,
        backgroundPosition: '0 0',
        width: '40px',
        height: '40px'
      }} />
  );
}

const mapStateToProps = ({ player }) => {
  return { player };
}

export default connect(mapStateToProps)(Player);
