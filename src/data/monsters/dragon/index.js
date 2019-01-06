import React from 'react';

import Monster      from '../../../features/monsters/monster';
import DragonSprite from './dragon.png';

function Dragon(props) {
  const { monster } = props;

  monster.sprite = DragonSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 50,
  maxHp: 50,
  damage: 10,
  defence: 10,
  exp: 150,
  type: 'dragon'
};

export default {
  Comp: Dragon,
  stats
};
