import React       from 'react';
import { connect } from 'react-redux';

import MapTile    from './map-tile';
import MapPadding from './map-padding';
import {
  SPRITE_SIZE,
  MAP_HEIGHT,
  MAP_WIDTH
} from '../../config/constants';

const GameMap = ({ map, world }) => {

  const { gameMode, storyMaps, randomMaps, currentMap, floorNum } = world;

  const mapStyle = {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    position: 'relative'
  };

  if(!currentMap) return (
    <div style={mapStyle} />
  );

  if(gameMode === 'story') {
    map = { ...map, ...storyMaps[currentMap] };
  }
  else {
    map = { ...map, ...randomMaps[floorNum - 1] };
  }

  const wallType = getWallType(map.tiles);

  return (
    <div style={mapStyle}>

      <MapPadding
        tileType={wallType}
        tiles={map.paddingTiles}
        sightBox={map.paddingSightBox} />

      {
        map.tiles.map((row, index) => {
          return (
            <MapRow
              tiles={row}
              index={index}
              sightBox={map.sightBox}
              key={JSON.stringify(row) + index} />
          );
        })
      }

    </div>
  );
};

const MapRow = props => {
  return (
    <div className='row'
      style={{ height: SPRITE_SIZE }}>
      {
        props.tiles.map((tile, index) => {
          return(
            <MapTile
              tile={tile}
              index={[index, props.index]}
              sightBox={props.sightBox}
              key={JSON.stringify(tile) + index} />
          );
        })
      }
    </div>
  );
};

function getWallType(tiles) {
  for(let i = 0; i < tiles.length; i ++) {
    for(let j = 0; j < tiles[i].length; j ++) {
      if(tiles[i][j].value === 5) return 5;
      if(tiles[i][j].value === 6) return 6;
      if(tiles[i][j].value === 7) return 7;
      if(tiles[i][j].value === 8) return 8;
    }
  }
}

const mapStateToProps = ({ world, map }) => ({ world, map });

export default connect(mapStateToProps)(GameMap);
