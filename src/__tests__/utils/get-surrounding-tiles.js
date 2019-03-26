import getSurroundingTiles, { radiusTiles } from '../../utils/get-surrounding-tiles';
import { MAP_DIMENSIONS }                   from '../../config/constants';

describe('getSurroundingTiles tests:', () => {

  describe('radiusTiles test ->', () => {
    test('returns the proper array: [[-4,-4]...[0,0]...[4,4]]', () => {
      const expected = [
                                              {x: 0, y: -3},
              {x: -2, y: -2}, {x: -1, y: -2}, {x: 0, y: -2}, {x: 1, y: -2}, {x: 2, y: -2},
              {x: -2, y: -1}, {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: 2, y: -1},
 {x: -3, y: 0}, {x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0},
                {x: -2, y: 1}, {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},
                {x: -2, y: 2}, {x: -1, y: 2}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2},
                                              {x: 0, y: 3}
      ];

      expect(radiusTiles()).toEqual(expected);
    });
  });

  describe('when startPos is out of bounds ->', () => {
    test('startPos height > MAX_HEIGHT: [0, 15]', () => {
      const startPos = [0, MAP_DIMENSIONS[1]];

      expect(getSurroundingTiles(startPos)).toBeFalsy();
    });

    test('startPos width > MAX_WIDTH: [20, 0]', () => {
      const startPos = [MAP_DIMENSIONS[0], 0];

      expect(getSurroundingTiles(startPos)).toBeFalsy();
    });

    test('startPos height < 0: [-1, 0]', () => {
      const startPos = [-1, 0];

      expect(getSurroundingTiles(startPos)).toBeFalsy();
    });

    test('startPos width < 0: [0, -1]', () => {
      const startPos = [0, -1];

      expect(getSurroundingTiles(startPos)).toBeFalsy();
    });
  });

  describe('returns correct array when ->', () => {
    test('startPos is top left corner: [0, 0]', () => {
      const startPos = [0, 0];
      const expected = [
        [0, 0], [1, 0], [2, 0], [3, 0],
        [0, 1], [1, 1], [2, 1],
        [0, 2], [1, 2], [2, 2],
        [0, 3]
      ];

      expect(getSurroundingTiles(startPos).tiles).toEqual(expected);
    });

    test('startPos is top right corner: [19, 0]', () => { 
      const startPos = [(MAP_DIMENSIONS[0] - 1), 0];
      const expected = [
        [16, 0], [17, 0], [18, 0], [19, 0],
                 [17, 1], [18, 1], [19, 1],
                 [17, 2], [18, 2], [19, 2],
                                   [19, 3]
      ];

      expect(getSurroundingTiles(startPos).tiles).toEqual(expected);
    });

    test('startPos is bottom right corner: [19, 14]', () => {
      const startPos = [(MAP_DIMENSIONS[0] - 1), (MAP_DIMENSIONS[1] - 1)];
      const expected = [
                                      [19, 11],
                  [17, 12], [18, 12], [19, 12],
                  [17, 13], [18, 13], [19, 13],
        [16, 14], [17, 14], [18, 14], [19, 14]
      ];

      expect(getSurroundingTiles(startPos).tiles).toEqual(expected);
    });

    test('startPos is bottom left corner: [0, 14]', () => {
      const startPos = [0, (MAP_DIMENSIONS[1] - 1)];
      const expected = [
        [0, 11],
        [0, 12], [1, 12], [2, 12],
        [0, 13], [1, 13], [2, 13],
        [0, 14], [1, 14], [2, 14], [3, 14]
      ];

      expect(getSurroundingTiles(startPos).tiles).toEqual(expected);
    });

    test('startPos is at an arbitrary point in bounds: [6, 5]', () => {
      const startPos = [6, 5];
      const expected = [
                                [6, 2],
                [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
                [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
        [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
                [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
                [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
                                [6, 8]
      ];

      expect(getSurroundingTiles(startPos).tiles).toEqual(expected);
    });

    test('startPos is at an arbitrary point in bounds: [7, 10]', () => {
      const startPos = [7, 10];
      const expected = [
                                    [7, 7],
                    [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
                    [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
         [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
                  [5, 11], [6, 11], [7, 11], [8, 11], [9, 11],
                  [5, 12], [6, 12], [7, 12], [8, 12], [9, 12],
                                    [7, 13]
      ];

      expect(getSurroundingTiles(startPos).tiles).toEqual(expected);
    });
  });
});