import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';

import SwordSlash     from './sword-slash.png';
import WalkSprite     from './player_walk.png';
import handleMovement from './movement';
import {
  ANIMATION_SPEED,
  SPRITE_SIZE
} from '../../config/constants';

import './styles.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationPlay: 'paused',
      attackAnimationPlay: 'paused'
    };

    this.stopAnimation = this.stopAnimation.bind(this);
    this.stopAttackAnimation = this.stopAttackAnimation.bind(this);
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
    // see if the player attacked
    if(prevProps.player.playerAttacked !== this.props.player.playerAttacked) {
      // animate the sword slash
      this.setState({ attackAnimationPlay: 'running' });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(this.stopAttackAnimation, ANIMATION_SPEED);
    }
  }

  stopAttackAnimation() {
    this.setState({ attackAnimationPlay: 'paused' });
  }

  stopAnimation() {
    this.setState({ animationPlay: 'paused' });
  }

  render() {
    const { animationPlay, attackAnimationPlay } = this.state;
    const { player, world } = this.props;

    const { gameStart } = world;
    // game start menu open, hide the player
    if(gameStart) return null;

    // calculate pixel offset for the correct facing direction sprite
    let spriteLocation;
    switch(player.direction) {
      case 'SOUTH':
        spriteLocation = `${SPRITE_SIZE*0}px`;
        break;
      case 'EAST':
        spriteLocation = `${SPRITE_SIZE*1}px`;
        break;
      case 'WEST':
        spriteLocation = `${SPRITE_SIZE*2}px`;
        break;
      case 'NORTH':
        spriteLocation = `${SPRITE_SIZE*3}px`;
        break;
      default:
    }

    return (
      <div className='player-animation'
        style={{
          top: player.position[1],
          left: player.position[0],
          backgroundImage: `url('${WalkSprite}')`,
          backgroundPositionY: spriteLocation,
          animationPlayState: animationPlay
        }}>
        <div className='sword-slash'
          style={{
            backgroundImage: `url('${SwordSlash}')`,
            animationPlayState: attackAnimationPlay
          }} />
      </div>
    );
  }
}

const mapStateToProps = ({ player, world }) => {
  return { player, world };
}

export default connect(mapStateToProps)(handleMovement(ReactTimeout(Player)));
