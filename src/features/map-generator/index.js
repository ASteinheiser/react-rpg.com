import React, { Component } from 'react';

import {
  MAP_DIMENSIONS,
  MAX_TUNNELS,
  MAX_LENGTH
} from '../../config/constants';

// generate a 'map' filled with wall tiles
function createMapOfWalls() {
  var array = [];
  for (var i = 0; i < MAP_DIMENSIONS[0]; i++) {
    array.push([]);
    for (var j = 0; j < MAP_DIMENSIONS[1]; j++) {
      array[i].push(5);
    }
  }
  return array;
}

export default class MapGenerator extends Component {
  //lets create a randomly generated map for our dungeon crawler
  createMap() {
    let dimensions = this.state.dimensions, // width and height of the map
      maxTunnels = this.state.maxTunnels, // max number of tunnels possible
      maxLength = this.state.maxLength, // max length each tunnel can have
      map = this.createArray(1, dimensions), // create a 2d array full of 1's
      currentRow = Math.floor(Math.random() * dimensions), // our current row - start at a random spot
      currentColumn = Math.floor(Math.random() * dimensions), // our current column - start at a random spot
      directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // array to get a random direction from (left,right,up,down)
      lastDirection = [], // save the last direction we went
      randomDirection; // next turn/direction - holds a value from directions

    // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
    while (maxTunnels && dimensions && maxLength) {

      // lets get a random direction - until it is a perpendicular to our lastDirection
      // if the last direction = left or right,
      // then our new direction has to be up or down,
      // and vice versa
      do {
         randomDirection = directions[Math.floor(Math.random() * directions.length)];
      } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

      var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
        tunnelLength = 0; //current length of tunnel being created

        // lets loop until our tunnel is long enough or until we hit an edge
      while (tunnelLength < randomLength) {

        //break the loop if it is going out of the map
        if (((currentRow === 0) && (randomDirection[0] === -1)) ||
            ((currentColumn === 0) && (randomDirection[1] === -1)) ||
            ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
            ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
          break;
        } else {
          map[currentRow][currentColumn] = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
          currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
          currentColumn += randomDirection[1];
          tunnelLength++; //the tunnel is now one longer, so lets increment that variable
        }
      }

      if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
        lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
        maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
      }
    }
    return map; // all our tunnels have been created and our map is complete, so lets return it to our render()
  };


  render() {
    let grid = this.createMap();
    return (
      <div >
        <div className="form-group row">
          <div className="left col-4">
            <label>dimensions</label>
            <input className="form-control" name="dimensions" type="text" maxLength="2" value={this.state.dimensions} onChange={this.onChange}/>
          </div>
          <div className="center col-4">
            <label>maxTunnels</label>
            <input className="form-control" name="maxTunnels" type="text" maxLength="3" value={this.state.maxTunnels} onChange={this.onChange}/>
          </div>
          <div className="right col-4">
            <label>maxLength</label>
            <input className="form-control" name="maxLength" type="text" maxLength="3" value={this.state.maxLength} onChange={this.onChange}/>
          </div>
        </div>
        <table className="grid" onClick={this.onClick}>
          <thead>
            {grid.map((obj, row) => <tr key={row}>{obj.map((obj2, col) =>< td className = {
                obj2 === 1
                  ? 'wall'
                  : 'tunnel'
              }
              key = {
                col
              } > </td>)}</tr>)}
          </thead>
        </table>
      </div>
    );
  }
}
