import React, { useState, useEffect } from 'react';
import { connect }                    from 'react-redux';

import Monster from './monster';

const Monsters = ({ monsters, world }) => {

  const { currentMap } = world;

  const [monstersToRender, setMonstersToRender] = useState(null);

  useEffect(() => {
    const monsterArray = [];
    // don't try to load if no maps
    if(JSON.stringify(monsters.components) === JSON.stringify({})) {
      setMonstersToRender(null);
    }
    else if(monsters.components[currentMap]) {
      // find each monster on the current map
      Object.keys(monsters.components[currentMap]).forEach(uuid => {
        monsterArray.push(
          <Monster key={uuid}
            monster={monsters.components[currentMap][uuid]} />
        );
      });

      setMonstersToRender(monsterArray);
    }
  }, [monsters, currentMap]);

  return ( monstersToRender );
};

const mapStateToProps = ({ monsters, world }) => ({ monsters, world });

export default connect(mapStateToProps)(Monsters);
