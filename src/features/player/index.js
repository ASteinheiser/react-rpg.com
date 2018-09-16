import React       from 'react';
import { connect } from 'react-redux';

import HealthBar      from '../../components/health-bar';
import WalkSprite     from './player_walk.png';
import handleMovement from './movement';

function Player(props) {
  const { player, stats, world } = props;
  const { gameStart } = world;

  // game start menu open, hide the player
  if(gameStart) return null;

  return (
    <div style={{
        position: 'absolute',
        top: player.position[1],
        left: player.position[0],
        backgroundImage: `url('${WalkSprite}')`,
        backgroundPosition: player.spriteLocation,
        width: '40px',
        height: '40px'
      }}>

      <HealthBar value={stats.hp} max={stats.maxHp} />

    </div>
  );
}

const mapStateToProps = ({ player, stats, world }) => {
  return { player, stats, world };
}

export default connect(mapStateToProps)(handleMovement(Player));
