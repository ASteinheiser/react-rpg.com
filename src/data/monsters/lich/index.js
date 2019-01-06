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
  hp: 100,
  maxHp: 100,
  damage: 20,
  defence: 20,
  exp: 300,
  type: 'lich'
};

export default {
  Comp: Lich,
  stats
};