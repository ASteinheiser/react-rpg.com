import React       from 'react';
import { connect } from 'react-redux';

import store from '../../config/store';

function Inventory(props) {
  return (
    <div>
      {'Inventory!'}
    </div>
  );
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(Inventory);
