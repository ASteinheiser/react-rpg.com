import React       from 'react';
import { connect } from 'react-redux';

import EquippedItems from '../equipped-items';

import './styles.css';

function Inventory(props) {
  return (
    <div className='inventory-container'>

      <EquippedItems />

      <div className='inventory-button-container'>
        <div className='flex-row inventory-button'>

          <i className='fa fa-briefcase inventory-icon' />

          <span> {'Inventory'} </span>

        </div>
      </div>

    </div>
  );
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(Inventory);
