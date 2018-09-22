import React       from 'react';
import { connect } from 'react-redux';

import './styles.css';

function Stats(props) {
  return (
    <div className='flex-row stats-border'>

      <div className='flex-column'>
        <div className='flex-row stats-row-spacing'>
          <span className='stats-text-spacing'>
            {'LEVEL: '}
          </span>
          <span>
            { props.stats.level }
          </span>
        </div>
        <div className='flex-row exp-bar-position'>
          <span className='exp-bar-container'>
            <span className='exp-bar-value'
              style={{ width: `${(props.stats.exp / props.stats.expToLevel) * 100}%` }} />
          </span>
        </div>
      </div>

      <div className='flex-column stats-column-spacing'>
        <div className='flex-row stats-row-spacing'>
          <span className='stats-text-spacing'>
            {'HP: '}
          </span>
          <span>
            { props.stats.hp + ' / ' + props.stats.maxHp }
          </span>
        </div>
        <div className='flex-row'>
          <span className='stats-text-spacing'>
            {'DMG: '}
          </span>
          <span>
            { props.stats.damage }
          </span>
        </div>
      </div>

      <div className='flex-column stats-column-spacing'>
        <div className='flex-row stats-row-spacing'>
          <span className='stats-text-spacing'>
            {'GOLD: '}
          </span>
          <span>
            { props.stats.gold }
          </span>
        </div>
        <div className='flex-row'>
          <span className='stats-text-spacing'>
            {'DEF: '}
          </span>
          <span>
            { props.stats.defence }
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
