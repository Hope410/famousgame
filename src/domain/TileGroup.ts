import Tile from './Tile';
import TileSet from './TileSet';

export default class TileGroup extends TileSet {
  private initialTile: Tile;

  private tileMap: TileSet;

  constructor(initialTile: Tile, tileMap: TileSet) {
    super([initialTile]);
    this.tileMap = tileMap;
    this.initialTile = initialTile;

    this.uniteNeighbors(initialTile);
  }

  public setColor(color: string): void {
    this.forEach((tile) => tile.setColor(color));
    this.uniteNeighbors(this.initialTile);
  }

  private uniteNeighbors(tile: Tile): void {
    const neighbors = this.tileMap
      .neighborsFor(tile)
      .filter((neighbor) => !this.get(neighbor.position.asKey()))
      .filter((neighbor) => neighbor.color === tile.color);

    if (neighbors.size > 0) {
      [...neighbors.values()].forEach((neighbor) => {
        this.set(neighbor.position.asKey(), neighbor);
        this.uniteNeighbors(neighbor);
      });
    }
  }
}
