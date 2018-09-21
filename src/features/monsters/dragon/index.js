import React from 'react';

import Monster      from '../monster';
import DragonSprite from './dragon.png';

function Dragon(props) {
  const { monster } = props;

  monster.sprite = DragonSprite;

  return (
    <Monster monster={monster} />
  );
}

export default Dragon;

export const dragonStats = {
  hp: 50,
  maxHp: 50,
  damage: 10,
  defence: 10,
  exp: 150,
  type: 'dragon'
};
