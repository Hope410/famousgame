import * as ERRORS from '@/config/errors';

import Tile from './Tile';
import TileSet from './TileSet';

export default class TileGroup extends TileSet {
  private initialTile: Tile;

  private tileMap: TileSet;

  constructor(initialTile: Tile, tileMap: TileSet) {
    if (!tileMap.get(initialTile.position.asKey())) {
      throw new Error(ERRORS.INITIAL_TILE_EXCLUDED);
    }

    super([initialTile]);

    this.tileMap = tileMap;
    this.initialTile = initialTile;

    this.uniteNeighbors(this.initialTile);
  }

  public setColor(color: string): void {
    this.forEach((tile) => tile.setColor(color));
    this.clear();
    this.uniteNeighbors(this.initialTile);
  }

  private uniteNeighbors(tile: Tile): void {
    const neighbors = this.tileMap
      .neighborsFor(tile)
      .filter((neighbor) => !this.get(neighbor.position.asKey()))
      .filter((neighbor) => neighbor.color === tile.color);

    if (neighbors.size > 0) {
      neighbors.forEach((neighbor) => {
        this.set(neighbor.position.asKey(), neighbor);
        this.uniteNeighbors(neighbor);
      });
    }
  }
}
