import { MAP_DIMENSIONS, MAP_PADDING_DISTANCE } from '../config/constants';

/**
 * Generate the padding tiles that go around the map so that it appears as if
 * the walls go on forever, and so they cannot see the end of the map.
 */
export default function generatePaddingTiles() {
    const top = [];
    const bottom = [];
    const left = [];
    const right = [];

    for (let i = 0; i < MAP_PADDING_DISTANCE; i++) {
        const topRow = [];
        const bottomRow = [];

        for (let j = 0; j < MAP_DIMENSIONS[0]; j++) {
            topRow.push({
                location: [-i + -1, j],
                explored: 0,
                variation: Math.round(Math.random() * (4 - 1) + 1),
            });
            bottomRow.push({
                location: [i + MAP_DIMENSIONS[1], j],
                explored: 0,
                variation: Math.round(Math.random() * (4 - 1) + 1),
            });
        }

        top.push(topRow);
        bottom.push(bottomRow);
    }

    for (let i = 0; i < MAP_DIMENSIONS[0] + MAP_PADDING_DISTANCE; i++) {
        const leftRow = [];
        const rightRow = [];

        for (let j = 0; j < MAP_PADDING_DISTANCE; j++) {
            leftRow.push({
                location: [i - MAP_PADDING_DISTANCE, j - MAP_PADDING_DISTANCE],
                explored: 0,
                variation: Math.round(Math.random() * (4 - 1) + 1),
            });
            rightRow.push({
                location: [i - MAP_PADDING_DISTANCE, j + MAP_DIMENSIONS[0]],
                explored: 0,
                variation: Math.round(Math.random() * (4 - 1) + 1),
            });
        }

        left.push(leftRow);
        right.push(rightRow);
    }

    return {
        top,
        bottom,
        left,
        right,
    };
}
