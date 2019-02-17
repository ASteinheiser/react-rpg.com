import React       from 'react';
import { connect } from 'react-redux';

import MapPadding from './map-padding';
import Flame      from '../../components/flame';
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants';

export function getTileSprite(type, variation) {
  switch(type) {
    case -2:
      return 'chest-open'
    case -1:
      return 'blood-splatter'
    case 0:
      return `ground-${variation}`
    case 2:
      return 'stairs-down'
    case 3:
      return 'stairs-up'
    case 4:
      return 'chest'
    case 5:
      return `brick-wall-${variation}`
    case 6:
      return `ornate-wall-${variation}`
    case 7:
      return `blue-wall-${variation}`
    case 8:
      return `skull-wall-${variation}`
    case 9:
      return 'shop'
    case 10:
      return 'shrine'
    default:
  }
}

export function FogTile({ inSight, explored }) {
  // show the tile by default
  let opacity = '0';
  // if the tile is out of sight, show faded
  if(!inSight) opacity = '0.5';
  // if the tile is unexplored, hide it
  if(!explored) opacity = '1';
  // render fog tiles
  return (
    <div style={{
        backgroundColor: '#000',
        opacity,
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
        transition: 'opacity .5s linear'
      }} />
  );
}

function GroundTile({ variation, children }) {
  return (
    <div
      style={{
        backgroundImage: `url('/tiles/ground-${variation}.png')`,
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}>
      { children }
    </div>
  )
}

function MapTile({ tile, index, sightBox }) {

  let inSight = false;
  // if you need to render the sightBox
  if(sightBox) {
    // check the sight box tiles
    sightBox.forEach(sightValue => {
      // if the current tile is in range
      if(JSON.stringify(sightValue) === JSON.stringify(index)) {
        // remove the overlay
        return inSight = true;
      }
    });
  }
  // case for rendering animated flame tile
  if(tile.value === 20) {
    return (
      <GroundTile variation={tile.variation}>
        <Flame position={index}>
          <FogTile explored={tile.explored} inSight={inSight} />
        </Flame>
      </GroundTile>
    );
  }
  // case for rendering normal tiles
  return (
    <GroundTile variation={tile.variation}>
      <div
        style={{
          backgroundImage: `url(/tiles/${getTileSprite(tile.value, tile.variation)}.png)`,
          height: SPRITE_SIZE,
          width: SPRITE_SIZE,
        }}>
        <FogTile explored={tile.explored} inSight={inSight} />
      </div>
    </GroundTile>
  );
}

function MapRow(props) {
  return (
    <div className='row'
      style={{
        height: SPRITE_SIZE,
      }}>
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
  )
}

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
  } else {
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
}

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
