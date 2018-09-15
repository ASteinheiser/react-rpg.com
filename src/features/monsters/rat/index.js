import React from 'react';

import Monster   from '../monster';
import RatSprite from './rat.png';

function Rat(props) {
  const { monster } = props;

  monster.sprite = RatSprite;

  return (
    <Monster monster={monster} />
  );
}

export default Rat;

export const ratStats = {
  hp: 5,
  maxHp: 5,
  damage: 1,
  exp: 5
};
