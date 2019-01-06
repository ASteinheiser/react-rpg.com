import React from 'react';

import Monster   from '../../../features/monsters/monster';
import ImpSprite from './imp.png';

function Imp(props) {
  const { monster } = props;

  monster.sprite = ImpSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 30,
  maxHp: 30,
  damage: 8,
  defence: 6,
  exp: 40,
  type: 'imp'
};

export default {
  Comp: Imp,
  stats
};