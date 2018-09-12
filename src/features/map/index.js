import React       from 'react';
import { connect } from 'react-redux';

function Map(props) {
  const { map } = props;

  return (
    <div style={{
        width: '800px',
        height: '600px',
        backgroundColor: '#d4d4d4',
        border: '4px solid #000',
      }} />
  );
}

const mapStateToProps = ({ map }) => {
  return { map };
}

export default connect(mapStateToProps)(Map);
