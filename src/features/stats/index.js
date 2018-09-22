import React       from 'react';
import { connect } from 'react-redux';

import './styles.css';

function Stats(props) {
  return (
    <div className='flex-row stats-container white-border'>

      <div className='flex-column'>
        <div className='flex-row stats-row-spacing'>
          <span className='stats-text-spacing'>
            {'LEVEL: '}
          </span>
          <span className='stats-text-level'>
            { props.stats.level }
          </span>
        </div>
        <div className='flex-row exp-bar-position'>
          <span className='exp-bar-container'>
            <span className='flex-row stats-bar-value-text'>
              {'EXP'}
            </span>
            <span className='exp-bar-value'
              style={{ width: `${(props.stats.exp / props.stats.expToLevel) * 100}%` }}>
            </span>
          </span>
        </div>
      </div>

      <div className='flex-column stats-column-spacing'>
        <div className='flex-row stats-row-spacing'>
          <span className='stats-text-spacing'>
            {'ATK: '}
          </span>
          <span className='stats-text-damage'>
            { props.stats.damage }
          </span>
        </div>
        <div className='flex-row'>
          <span className='stats-text-spacing'>
            {'DEF: '}
          </span>
          <span className='stats-text-defence'>
            { props.stats.defence }
          </span>
        </div>
      </div>

      <div className='flex-column stats-column-spacing'>
        <div className='flex-row stats-row-spacing'>
          <div className='flex-row stats-hp-bar-position'>
            <span className='stats-hp-bar-container'>
              <span className='flex-row stats-bar-value-text'>
                {'Hp'}
              </span>
              <span className='stats-hp-bar-value'
                style={{ width: `${(props.stats.hp / props.stats.maxHp) * 100}%` }}>
              </span>
            </span>
          </div>
        </div>
        <div className='flex-row'>
          <span className='stats-text-spacing'>
            {'GOLD: '}
          </span>
          <span className='stats-text-gold'>
            { props.stats.gold }
          </span>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = ({ stats }) => {
  return { stats };
}

export default connect(mapStateToProps)(Stats);
