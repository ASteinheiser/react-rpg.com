import React from 'react';

import Monster      from '../../../features/monsters/monster';
import GoblinSprite from './goblin.png';

function Goblin({ monster }) {

  monster.sprite = GoblinSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 12,
  maxHp: 12,
  damage: 4,
  defence: 3,
  exp: 25,
  type: 'goblin'
};

export default {
  Comp: Goblin,
  stats
};