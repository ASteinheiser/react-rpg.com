import React from 'react';

import HealthBar    from '../../../components/health-bar';
import GoblinSprite from './goblin.png';

function Goblin(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${GoblinSprite}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
}

export default Goblin;

export const goblinStats = {
  hp: 10,
  maxHp: 10,
  damage: 2,
  exp: 10
};
