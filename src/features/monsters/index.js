import { connect } from 'react-redux';

import store from '../../config/store';

function Monsters(props) {
  const { monsters } = props;
  const { currentMap } = store.getState().world;

  let monstersToRender = [];
  // don't try to load if no maps
  if(JSON.stringify(monsters.components) === JSON.stringify({})) {
    return null;
  }
  // find each monster on the current map
  Object.keys(monsters.components[currentMap]).forEach(uuid => {
    monstersToRender.push(monsters.components[currentMap][uuid]);
  });
  // render the monsters!
  return ( monstersToRender );
}

const mapStateToProps = ({ monsters }) => {
  return { monsters };
}

export default connect(mapStateToProps)(Monsters);
