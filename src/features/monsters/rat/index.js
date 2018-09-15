import React from 'react';

import HealthBar from '../../../components/health-bar';
import RatSprite from './rat.png';

function Rat(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${RatSprite}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
}

export default Rat;

export const ratStats = {
  hp: 5,
  maxHp: 5,
  damage: 1,
  exp: 5
};
