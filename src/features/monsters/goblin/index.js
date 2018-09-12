import React       from 'react';
// import { connect } from 'react-redux';

import GoblinSprite from './goblin.png';

function Goblin(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${GoblinSprite}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px'
      }} />
  );
}

// const mapStateToProps = ({ monster }) => {
//   return { monster };
// }
//
// export default connect(mapStateToProps)(Goblin);
export default Goblin;
