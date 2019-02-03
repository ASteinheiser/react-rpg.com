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
  hp: 60,
  maxHp: 60,
  damage: 15,
  defence: 8,
  exp: 400,
  type: 'dragon'
};

export default {
  Comp: Dragon,
  stats
};
