import React from 'react';

import Monster     from '../monster';
import GolemSprite from './stone-golem.png';

function StoneGolem(props) {
  const { monster } = props;

  monster.sprite = GolemSprite;

  return (
    <Monster monster={monster} />
  );
}

export default StoneGolem;

export const stoneGolemStats = {
  hp: 20,
  maxHp: 20,
  damage: 3,
  exp: 25
};
