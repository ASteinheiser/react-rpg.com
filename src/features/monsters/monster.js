import React from 'react';

import HealthBar from '../../components/health-bar';

function Monster(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${monster.sprite}')`,
        opacity: monster.visible ? 1 : 0,
        width: '40px',
        height: '40px',
        transition: 'left .35s ease-out 0s, top .35s ease-out 0s, opacity .35s ease-out 0s'
      }}>

      <HealthBar value={monster.hp} max={monster.maxHp} />

    </div>
  );
}

export default Monster;
