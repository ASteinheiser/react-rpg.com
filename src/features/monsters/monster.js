import React from 'react';
import { SPRITE_SIZE } from '../../config/constants';
import HealthBar from '../../components/health-bar';

const Monster = ({ monster }) => {
  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${monster.sprite}')`,
        opacity: monster.visible ? 1 : 0,
        width: `${SPRITE_SIZE}px`,
        height: `${SPRITE_SIZE}px`,
        transition: 'left .35s ease-in-out .15s, top .35s ease-in-out .15s, opacity .35s ease-in-out'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
};

export default Monster;
