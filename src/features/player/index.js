import React, { Component } from 'react';
import { connect }          from 'react-redux';
import ReactTimeout         from 'react-timeout';
import Sound                from 'react-sound';
import store                from '../../config/store';

import PlayerStep     from './player-step.wav';
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
      attackAnimationPlay: 'paused',
      attackAnimationLoc: [0, 0],
      animationWalkSound: null
    };

    this.stopAnimation = this.stopAnimation.bind(this);
    this.stopAttackAnimation = this.stopAttackAnimation.bind(this);
  }

  // this is used to tell when to animate the player
  componentDidUpdate(prevProps, prevState) {
    // detemine when the player has moved
    if(prevProps.player.playerMoved !== this.props.player.playerMoved) {
      let animationWalkSound = null;
      if(store.getState().world.sound) {
        animationWalkSound = (
          <Sound
            url={PlayerStep}
            playStatus={'PLAYING'}
            autoLoad={true}
            volume={100} />
        );
      }
      // animate the player
      this.setState({ animationPlay: 'running', animationWalkSound });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(this.stopAnimation, ANIMATION_SPEED);
    }
    // see if the player attacked
    if(prevProps.player.playerAttacked !== this.props.player.playerAttacked) {
      let attackAnimationLoc = [0, 0];
      // calculate which way the sword should slash
      switch(this.props.player.direction) {
        case 'SOUTH':
          attackAnimationLoc = [0, SPRITE_SIZE];
          break;
        case 'EAST':
          attackAnimationLoc = [SPRITE_SIZE, 0];
          break;
        case 'WEST':
          attackAnimationLoc = [-SPRITE_SIZE, 0];
          break;
        case 'NORTH':
          attackAnimationLoc = [0, -SPRITE_SIZE];
          break;
        default:
      }
      // animate the sword slash
      this.setState({ attackAnimationPlay: 'running', attackAnimationLoc });
      // pause the infinite animation after 1 iteration
      this.props.setTimeout(this.stopAttackAnimation, ANIMATION_SPEED);
    }
  }

  stopAttackAnimation() {
    this.setState({ attackAnimationPlay: 'paused' });
  }

  stopAnimation() {
    this.setState({ animationPlay: 'paused', animationWalkSound: null });
  }

  render() {
    const { animationPlay, attackAnimationPlay, attackAnimationLoc, animationWalkSound } = this.state;
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
        { animationWalkSound }
        <div className='sword-slash'
          style={{
            top: attackAnimationLoc[1],
            left: attackAnimationLoc[0],
            backgroundImage: `url('${SwordSlash}')`,
            animationPlayState: attackAnimationPlay,
            opacity: attackAnimationPlay === 'running' ? 1 : 0
          }} />
      </div>
    );
  }
}

const mapStateToProps = ({ player, world }) => {
  return { player, world };
}

export default connect(mapStateToProps)(handleMovement(ReactTimeout(Player)));
