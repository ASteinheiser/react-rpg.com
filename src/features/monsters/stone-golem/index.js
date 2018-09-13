import React from 'react';

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
      }} />
  );
}

export default StoneGolem;

export const stoneGolemStats = {
  hp: 20,
  damage: 5,
  exp: 25
};
