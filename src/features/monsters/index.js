import React       from 'react';
import { connect } from 'react-redux';

function Monsters(props) {
  const { monsters } = props;

  console.log(monsters);

  return (
    <div>
      {'Monsters'}
    </div>
  );
}

const mapStateToProps = ({ monsters }) => {
  return { monsters };
}

export default connect(mapStateToProps)(Monsters);
