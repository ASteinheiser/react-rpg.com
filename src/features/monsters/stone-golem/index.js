import React       from 'react';
// import { connect } from 'react-redux';

import GolemSprite from './stone-golem.png';

function StoneGolem(props) {
  const { monster } = props;

  return (
    <div style={{
        position: 'absolute',
        top: monster.position[1],
        left: monster.position[0],
        backgroundImage: `url('${GolemSprite}')`,
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
// export default connect(mapStateToProps)(StoneGolem);
export default StoneGolem;
