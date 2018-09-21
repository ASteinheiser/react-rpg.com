import React from 'react';

import Monster      from '../monster';
import GoblinSprite from './goblin.png';

function Goblin(props) {
  const { monster } = props;

  monster.sprite = GoblinSprite;

  return (
    <Monster monster={monster} />
  );
}

export default Goblin;

export const goblinStats = {
  hp: 10,
  maxHp: 10,
  damage: 4,
  defence: 2,
  exp: 20,
  type: 'goblin'
};
