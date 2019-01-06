import React from 'react';

import Monster     from '../../../features/monsters/monster';
import GolemSprite from './stone-golem.png';

function StoneGolem(props) {
  const { monster } = props;

  monster.sprite = GolemSprite;

  return (
    <Monster monster={monster} />
  );
}

const stats = {
  hp: 20,
  maxHp: 20,
  damage: 6,
  defence: 5,
  exp: 40,
  type: 'golem'
};

export default {
  Comp: StoneGolem,
  stats
};