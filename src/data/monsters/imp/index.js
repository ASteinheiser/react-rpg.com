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
  hp: 40,
  maxHp: 40,
  damage: 14,
  defence: 4,
  exp: 150,
  type: 'imp'
};

export default {
  Comp: Imp,
  stats
};