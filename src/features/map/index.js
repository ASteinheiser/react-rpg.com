import React       from 'react';
import { connect } from 'react-redux';

import Flame           from '../../components/flame';
import { SPRITE_SIZE } from '../../config/constants';

function getTileSprite(type) {
  switch(type) {
    case -2:
      return 'chest-open'
    case -1:
      return 'blood-splatter'
    case 0:
      return 'ground'
    case 1:
      return 'stone-wall' // fake stone-wall obstacles
    case 2:
      return 'stairs-down'
    case 3:
      return 'stairs-up'
    case 4:
      return 'chest'
    case 5:
      return 'stone-wall'
    case 6:
      return 'cracked-wall'
    case 7:
      return 'skull-wall'
    case 8:
      return 'eye-wall'
    case 9:
      return 'shop'
    case 10:
      return 'shrine'
    default:
  }
}

function HiddenTile(props) {
  return (
    <div style={{
        backgroundColor: 'black',
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }} />
  );
}

function PartiallyHiddenTile(props) {
  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'inline-flex',
      height: SPRITE_SIZE,
      width: SPRITE_SIZE,
    }} />
  );
}

function GroundTile(props) {
  return (
    <div
      style={{
        backgroundImage: 'url(\'/tiles/ground.png\')',
        backgroundSize: 'contain',
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}>
      { props.children }
    </div>
  )
}

function MapTile(props) {
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
  // return a hidden tile if not explored
  if(!props.tile.explored) {
    return (
      <HiddenTile />
    );
  }
  // case for rendering animated flame tile
  if(props.tile.value === 20) {
    return (
      <GroundTile>
        <Flame position={props.index}>
          {
            inSight ?
              null
              :
              <PartiallyHiddenTile />
          }
        </Flame>
      </GroundTile>
    );
  }
  // case for rendering normal tiles
  return (
    <GroundTile>
      <div
        style={{
          backgroundImage: `url(/tiles/${getTileSprite(props.tile.value)}.png)`,
          backgroundSize: 'contain',
          height: SPRITE_SIZE,
          width: SPRITE_SIZE,
        }}>
        {
          inSight ?
            null
            :
            <PartiallyHiddenTile />
        }
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
