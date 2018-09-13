import React       from 'react';
import { connect } from 'react-redux';

import Map      from '../map';
import Monsters from '../monsters';
import Player   from '../player';
import maps     from '../../data/maps';
import store    from '../../config/store';

class World extends React.Component {

  componentDidMount() {
    this.handleLoadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.world !== this.props.world){
      this.handleLoadMap();
    }
  }

  handleLoadMap() {
    const { world } = this.props;
    // set map tiles for current map
    store.dispatch({
      type: 'ADD_TILES',
      payload: { tiles: maps[world.currentMap] }
    })
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        width: '800px',
        height: '600px',
        margin: '25px auto',
      }}>
        <Map />
        <Player />
        <Monsters />
      </div>
    );
  }
}

const mapStateToProps = ({ world }) => {
  return { world };
}

export default connect(mapStateToProps)(World);
