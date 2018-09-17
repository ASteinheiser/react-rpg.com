import React, { Component } from 'react';

import Flames          from './flames.png';
import { SPRITE_SIZE } from '../../config/constants';

import './styles.css';

export default class Flame extends Component {
  render() {
    const { position } = this.props;

    const top = position ? (position[0] * SPRITE_SIZE) : 0;
    const left = position ? (position[1] * SPRITE_SIZE) : 0;

    return (
      <div className='flame-container'
        style={{
          top,
          left,
          backgroundImage: `url('${Flames}')`
        }}>
          { this.props.children }
        </div>
    );
  }
}
