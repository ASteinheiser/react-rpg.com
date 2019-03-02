import React from 'react';

import Flames          from './flames.png';
import { SPRITE_SIZE } from '../../config/constants';

import './styles.scss';

const Flame = ({ children, position }) => {

  const top = position ? (position[1] * SPRITE_SIZE) : 0;
  const left = position ? (position[0] * SPRITE_SIZE) : 0;

  return (
    <div className='flame__container'
      style={{
        top,
        left,
        backgroundImage: `url('${Flames}')`
      }}>

      { children }

    </div>
  );
};

export default Flame;
