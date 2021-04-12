import _ from 'lodash';

import Vector2D from '@/utils/Vector2D';

import { ERRORS } from '@/config';
import { Tuple2D } from '@/types';

import Tile from './Tile';
import TileGroup from './TileGroup';
import TileSet from './TileSet';

interface GameOptions {
  mapSize: Tuple2D<number>;
  colors: string[];
}

export default class Game {
  tileMap: TileSet;

  tileGroup: TileGroup;

  colors: string[];

  constructor(payload: GameOptions | TileSet) {
    if (payload instanceof TileSet) {
      this.tileMap = payload;
      this.colors = _.union([...payload.values()].map((tile) => tile.color));
    } else {
      this.colors = payload.colors;
      const [width, height] = payload.mapSize;

      this.tileMap = new TileSet(
        _.range(width * height).map(
          (idx) =>
            new Tile({
              position: new Vector2D(_.floor(idx / width), idx % height),
              color: this.colors[_.random(this.colors.length - 1)],
            })
        )
      );
    }

    this.tileGroup = new TileGroup(this.initialTile, this.tileMap);
  }

  get initialTile() {
    const tile = this.tileMap.get(new Vector2D(0, 0).asKey());
    if (!tile) {
      throw new Error(ERRORS.NO_INITIAL_TILE);
    }

    return tile;
  }

  // get tileGroup() {
  //   const findNeighbors = (tile: Tile, tileGroup: TileSet): TileSet => {
  //     const neighbors = this.tileMap
  //       .neighborsFor(tile)
  //       .filter((neighbor) => !tileGroup.get(neighbor.position.asKey()))
  //       .filter((neighbor) => neighbor.color === tile.color);

  //     if (neighbors.size > 0) {
  //       [...neighbors.values()].forEach((neighbor) =>
  //         tileGroup.set(neighbor.position.asKey(), neighbor)
  //       );

  //       return tileGroup.union(
  //         [...neighbors.values()]
  //           .map((neighborTile) => findNeighbors(neighborTile, tileGroup))
  //           .reduce((acc, set) => acc.union(set), new TileSet())
  //       );
  //     }

  //     return tileGroup;
  //   };

  //   return findNeighbors(this.initialTile, new TileSet([this.initialTile]));
  // }
}
