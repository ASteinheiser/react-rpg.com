import { MAP_DIMENSIONS } from '../config/constants';

export default function generatePaddingTiles() {
  // we need to add padding tiles so the
  // player cannot see past the edge of the map
  let top = [];
  let bottom = [];
  let left = [];
  let right = [];

  for(let i = 0; i < 5; i ++) {
    let topRow = [];
    let bottomRow = [];
    for(let j = 0; j < 20; j ++) {
      topRow.push({
        location: [(-i) + (-1), j],
        explored: 0,
        variation: Math.round(Math.random() * (4 - 1) + 1)
      });
      bottomRow.push({
        location: [i + MAP_DIMENSIONS[0], j],
        explored: 0,
        variation: Math.round(Math.random() * (4 - 1) + 1)
      });
    }
    top.push(topRow);
    bottom.push(bottomRow);
  }

  for(let i = 0; i < 25; i ++) {
    let leftRow = [];
    let rightRow = [];
    for(let j = 0; j < 5; j ++) {
      leftRow.push({
        location: [i - 5, j - 5],
        explored: 0,
        variation: Math.round(Math.random() * (4 - 1) + 1)
      });
      rightRow.push({
        location: [i - 5, j + MAP_DIMENSIONS[1]],
        explored: 0,
        variation: Math.round(Math.random() * (4 - 1) + 1)
      });
    }
    left.push(leftRow);
    right.push(rightRow);
  }

  return {
    top,
    bottom,
    left,
    right
  };
}