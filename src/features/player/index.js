import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';

import HealthBar      from '../../components/health-bar';
import WalkSprite     from './player_walk.png';
import handleMovement from './movement';
import { ANIMATION_SPEED } from '../../config/constants';

import './styles.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationPlay: 'paused'
    };

    this.stopAnimation = this.stopAnimation.bind(this);
  }

  // this is used to tell when to animate the player
  componentDidUpdate(prevProps, prevState) {
    // detemine when the player has moved
    if(prevProps.player.playerMoved !== this.props.player.playerMoved) {
      // animate the player
      this.setState({ animationPlay: 'running' });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(this.stopAnimation, ANIMATION_SPEED);
    }
  }

  stopAnimation() {
    this.setState({ animationPlay: 'paused' });
  }

  render() {
    const { animationPlay } = this.state;
    const { player, stats, world } = this.props;

    const { gameStart } = world;
    // game start menu open, hide the player
    if(gameStart) return null;

    return (
      <div className='player-animation'
        style={{
          top: player.position[1],
          left: player.position[0],
          backgroundImage: `url('${WalkSprite}')`,
          backgroundPositionY: player.spriteLocation,
          animationPlayState: animationPlay
        }}>

        <HealthBar value={stats.hp} max={stats.maxHp} />

      </div>
    );
  }
}

const mapStateToProps = ({ player, stats, world }) => {
  return { player, stats, world };
}

export default connect(mapStateToProps)(handleMovement(ReactTimeout(Player)));
