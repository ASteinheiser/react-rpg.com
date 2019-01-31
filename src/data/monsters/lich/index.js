import React from 'react';

import Monster    from '../../../features/monsters/monster';
import LichSprite from './lich.png';

function Lich(props) {
  const { monster } = props;

  monster.sprite = LichSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 120,
  maxHp: 120,
  damage: 22,
  defence: 12,
  exp: 1000,
  type: 'lich'
};

export default {
  Comp: Lich,
  stats
};