import { useState, useEffect } from 'react';
import { connect }             from 'react-redux';

function Monsters({ monsters, world }) {

  const { currentMap } = world;

  const [monstersToRender, setMonstersToRender] = useState(null);

  useEffect(() => {
    let monsterArray = [];
    // don't try to load if no maps
    if(JSON.stringify(monsters.components) === JSON.stringify({})) {
      setMonstersToRender(null);
    } else if(monsters.components[currentMap]) {
      // find each monster on the current map
      Object.keys(monsters.components[currentMap]).forEach(uuid => {
        monsterArray.push(monsters.components[currentMap][uuid]);
      });

      setMonstersToRender(monsterArray);
    }
  });

  return ( monstersToRender );
}

const mapStateToProps = ({ monsters, world }) => ({ monsters, world });

export default connect(mapStateToProps)(Monsters);
