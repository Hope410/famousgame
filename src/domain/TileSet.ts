import { ArrayIterator } from 'lodash';

import Tile from '@/domain/Tile';

import Vector2D from '@/utils/Vector2D';

export default class TileSet extends Map<string, Tile> {
  constructor(tiles: Tile[] = []) {
    super(tiles.map((tile) => [tile.position.asKey(), tile]));
  }

  public filter(condition: ArrayIterator<Tile, boolean>): TileSet {
    const tiles = [...this.values()];
    return new TileSet(tiles.filter(condition));
  }

  public union(tileSet: TileSet): TileSet {
    return new TileSet([...this.values(), ...tileSet.values()]);
  }

  public neighborsFor(tile: Tile): TileSet {
    const tiles = Vector2D.directions
      .map((vec) => tile.position.subtract(vec))
      .map((vec) => this.get(vec.asKey()))
      .filter(Boolean) as Tile[];

    return new TileSet(tiles);
  }
}
