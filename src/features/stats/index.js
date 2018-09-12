import React       from 'react';
import { connect } from 'react-redux';

// import store from '../../config/store';

function Stats(props) {
  return (
    <div>
      {'Stats!'}
    </div>
  );
}

const mapStateToProps = ({ stats }) => {
  return { stats };
}

export default connect(mapStateToProps)(Stats);
