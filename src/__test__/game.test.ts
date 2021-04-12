import _ from 'lodash';

import Game from '@/domain/Game';
import TileSet from '@/domain/TileSet';

import { Tuple2D } from '@/types';

import Tile from '../domain/Tile';
import Vector2D from '../utils/Vector2D';

describe('For predefined TileMap 5x5', () => {
  const tileMapSize: Tuple2D<number> = [5, 5];

  const RED = 'red';
  const GREEN = 'green';
  const BLUE = 'blue';

  const tiles = _.flatten([
    [RED, RED, RED, GREEN, BLUE],
    [GREEN, RED, RED, BLUE, RED],
    [BLUE, RED, RED, GREEN, RED],
    [RED, BLUE, GREEN, BLUE, BLUE],
    [BLUE, BLUE, RED, BLUE, RED],
  ]).map(
    (color, idx) =>
      new Tile({
        color,
        position: new Vector2D(
          _.floor(idx / tileMapSize[0]),
          idx % tileMapSize[1]
        ),
      })
  );

  const tileMap = new TileSet(tiles);
  const game = new Game(tileMap);

  test('Tile map size must be equal to 25', () => {
    expect(game.tileMap.size).toBe(tileMapSize[0] * tileMapSize[1]);
  });

  test('Initial tile group size must be equal to 7', () => {
    expect(game.tileGroup.size).toBe(7);
  });

  test('Change TileGroup Color to green', () => {
    game.tileGroup.setColor(GREEN);
    game.tileGroup.forEach((tile) => expect(tile.color).toBe('green'));
  });

  test('Initial tile group size must be equal to 11', () => {
    expect(game.tileGroup.size).toBe(11);
  });
});
