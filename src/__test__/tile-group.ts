import _ from 'lodash'

import TileGroup from '@/domain/TileGroup';
import Tile from '@/domain/Tile';

import Vector2D from '@/utils/Vector2D';

describe('TileGroup test', () => {
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

  test('TileGroup creates without errors', () => {
    const initialTile = new Tile({
      position: new Vector2D(0, 0),
      color: 'red'
    });

    const tileMap = new TileMap([initialTile]);

    const
  });

  test('Tile changes color without errors', () => {
    const tile = new Tile({
      position: new Vector2D(0, 0),
      color: 'red',
    });
    expect(tile).toMatchSnapshot();

    tile.setColor('blue');
    expect(tile).toMatchSnapshot();
  });
});
