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
  hp: 6,
  maxHp: 6,
  damage: 2,
  defence: 0,
  exp: 5,
  type: 'rat'
};
