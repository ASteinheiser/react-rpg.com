import React       from 'react';
import { connect } from 'react-redux';

import Flame           from '../../components/flame';
import { SPRITE_SIZE } from '../../config/constants';

function getTileSprite(type, variation) {
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
      return `stone-wall-${variation}`
    case 6:
      return `blue-wall-${variation}`
    case 7:
      return `skull-wall-${variation}`
    case 8:
      return `eye-wall-${variation}`
    case 9:
      return 'shop'
    case 10:
      return 'shrine'
    default:
  }
}

function FogTile(props) {
  // show the tile by default
  let opacity = '0';
  // if the tile is out of sight, show faded
  if(!props.inSight) opacity = '0.5';
  // if the tile is unexplored, hide it
  if(!props.explored) opacity = '1';
  // render fog tiles
  return (
    <div style={{
        backgroundColor: '#000',
        opacity,
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
        transition: 'opacity .35s ease-in-out'
      }} />
  );
}

function GroundTile(props) {
  return (
    <div
      style={{
        backgroundImage: `url('/tiles/ground-${props.variation}.png')`,
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}>
      { props.children }
    </div>
  )
}

function MapTile(props) {
  const { tile } = props;
  let inSight = false;
  // if you need to render the sightBox
  if(props.sightBox) {
    // check the sight box tiles
    props.sightBox.forEach(sightBox => {
      // if the current tile is in range
      if(JSON.stringify(sightBox) === JSON.stringify(props.index)) {
        // remove the overlay
        return inSight = true;
      }
    });
  }
  // case for rendering animated flame tile
  if(tile.value === 20) {
    return (
      <GroundTile variation={tile.variation}>
        <Flame position={props.index}>
          <FogTile explored={tile.explored} inSight={inSight} />
        </Flame>
      </GroundTile>
    );
  }
  // case for rendering normal tiles
  return (
    <GroundTile>
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
    <div className="row"
      style={{
        height: SPRITE_SIZE,
      }}>
      {
        props.tiles.map((tile, index) => {
          return(
            <MapTile
              tile={tile}
              index={[props.index, index]}
              sightBox={props.sightBox}
              key={JSON.stringify(tile) + index} />
          );
        })
      }
    </div>
  )
}

function Map(props) {
  const { map, world } = props;
  const { gameStart } = world;

  // game start menu open, hide the map
  if(gameStart) return <div style={{ width: '800px', height: '600px' }} />;

  return (
    <div style={{
      width: '800px',
      height: '600px'
    }}>
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

const mapStateToProps = ({ map, world }) => {
  return { map, world };
}

export default connect(mapStateToProps)(Map);
