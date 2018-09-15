import React from 'react';

import HealthBar    from '../../../components/health-bar';
import DragonSprite from './dragon.png';

function Dragon(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${DragonSprite}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
}

export default Dragon;

export const dragonStats = {
  hp: 50,
  maxHp: 50,
  damage: 5,
  exp: 100
};
