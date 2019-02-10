import React from 'react';

import './styles.scss';

const StatsItem = ({ stats }) => {

  let name = stats.name;
  if(name === 'damage') name = 'attack';

  function getColor(name) {
    switch(name) {
      case 'damage':
        return 'light-red';
      case 'defence':
        return 'purple';
      case 'hp':
      case 'heal':
        return 'green';
      case 'slots':
      case 'VS. dragon':
      case 'VS. lich':
        return 'orange';
      default:
    }
  }

  return(
    <div className='flex-row stats-item__container'>

      <span>{ name }</span>

      <span style={{ color: `var(--${getColor(stats.name)})` }}>

        { `+${stats.value}${stats.name === 'heal' ? '%' : ''}` }

      </span>

    </div>
  );
}

export default StatsItem;
