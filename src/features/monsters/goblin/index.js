import React from 'react';

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
      }} />
  );
}

export default Goblin;

export const goblinStats = {
  hp: 5,
  damage: 3,
  exp: 5
};
