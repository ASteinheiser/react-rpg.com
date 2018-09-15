import React, { Component } from 'react';

import './styles.css';

class StatsItem extends Component {
  render() {
    const { stats } = this.props;

    return(
      <div className='flex-column'>
        <span className='flex-row'>
          { stats.name }
        </span>
        <span className='flex-row'>
          { stats.value }
        </span>
      </div>
    );
  }
}

export default StatsItem;
