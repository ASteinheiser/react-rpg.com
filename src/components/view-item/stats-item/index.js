import React, { Component } from 'react';

import './styles.css';

class StatsItem extends Component {
  render() {
    const { stats } = this.props;

    return(
      <div className='flex-row stats-item-container'>
        <span>
          { stats.name }
        </span>
        <span>
          { stats.value }
        </span>
      </div>
    );
  }
}

export default StatsItem;
