import React from 'react';

import Monster     from '../../../features/monsters/monster';
import GolemSprite from './stone-golem.png';

function StoneGolem({ monster }) {

  monster.sprite = GolemSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 30,
  maxHp: 30,
  damage: 8,
  defence: 5,
  exp: 60,
  type: 'stone-golem'
};

export default {
  Comp: StoneGolem,
  stats
};