import React from 'react';

import Flames          from './flames.png';
import { SPRITE_SIZE } from '../../config/constants';

import './styles.scss';

const Flame = (props) => {

  const { position } = props;

  const top = position ? (position[0] * SPRITE_SIZE) : 0;
  const left = position ? (position[1] * SPRITE_SIZE) : 0;

  return (
    <div className='flame-container'
      style={{
        top,
        left,
        backgroundImage: `url('${Flames}')`
      }}>
        { props.children }
      </div>
  );
}

export default Flame;
