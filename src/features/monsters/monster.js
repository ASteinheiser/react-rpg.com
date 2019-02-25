import React from 'react';

import HealthBar from '../../components/health-bar';

const Monster = ({ monster }) => {
  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${monster.sprite}')`,
        opacity: monster.visible ? 1 : 0,
        width: '40px',
        height: '40px',
        transition: 'left .35s ease-in-out .15s, top .35s ease-in-out .15s, opacity .35s ease-in-out'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
};

export default Monster;
