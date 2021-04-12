import Tile from '@/domain/Tile';

import Vector2D from '@/utils/Vector2D';

describe('Tile test', () => {
  test('Tile creates without errors', () => {
    const tile = new Tile({
      position: new Vector2D(0, 0),
      color: 'red',
    });
    expect(tile).toMatchSnapshot();
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
