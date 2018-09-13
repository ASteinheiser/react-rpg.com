import React       from 'react';
import { connect } from 'react-redux';

import './styles.css';

function Inventory(props) {
  return (
    <div className='inventory-button-container'>

      <div className='flex-row inventory-button'>

        <i className='fa fa-briefcase inventory-icon-padding' />
        <span> {'Inventory'} </span>

      </div>

    </div>
  );
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(Inventory);
