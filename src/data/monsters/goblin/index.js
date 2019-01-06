import React from 'react';

import Monster      from '../../../features/monsters/monster';
import GoblinSprite from './goblin.png';

function Goblin(props) {
  const { monster } = props;

  monster.sprite = GoblinSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 10,
  maxHp: 10,
  damage: 4,
  defence: 3,
  exp: 20,
  type: 'goblin'
};

export default {
  Comp: Goblin,
  stats
};