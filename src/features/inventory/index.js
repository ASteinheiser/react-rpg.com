import React       from 'react';
import { connect } from 'react-redux';

import InventoryDialog from '../../components/inventory-dialog';
import EquippedItems   from '../equipped-items';
import store           from '../../config/store';

import './styles.css';

function Inventory(props) {
  return (
    <div className='inventory-container'>

      <EquippedItems />

      <div onClick={() => {
          store.dispatch({
            type: 'PAUSE',
            payload: { component: <InventoryDialog /> }
          })
        }}
        className='inventory-button-container'>

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
