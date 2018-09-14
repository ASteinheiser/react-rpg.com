import React from 'react';

import HealthBar   from '../../../components/health-bar';
import GolemSprite from './stone-golem.png';

function StoneGolem(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${GolemSprite}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
}

export default StoneGolem;

export const stoneGolemStats = {
  hp: 20,
  maxHp: 20,
  damage: 3,
  exp: 25
};
