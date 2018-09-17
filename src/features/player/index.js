import React       from 'react';
import { connect } from 'react-redux';

import HealthBar      from '../../components/health-bar';
import WalkSprite     from './player_walk.png';
import handleMovement from './movement';

import './styles.css';

function Player(props) {
  const { player, stats, world } = props;
  const { gameStart } = world;

  // game start menu open, hide the player
  if(gameStart) return null;

  let animationPlay = 'paused';
  // detemine when to play a movement animation
  if(false) {
    animationPlay = 'running';
  }

  return (
    <div className='player-animation'
      style={{
        position: 'absolute',
        top: player.position[1],
        left: player.position[0],
        backgroundImage: `url('${WalkSprite}')`,
        backgroundPositionY: player.spriteLocation,
        width: '40px',
        height: '40px',
        animationPlayState: animationPlay
      }}>

      <HealthBar value={stats.hp} max={stats.maxHp} />

    </div>
  );
}

const mapStateToProps = ({ player, stats, world }) => {
  return { player, stats, world };
}

export default connect(mapStateToProps)(handleMovement(Player));
