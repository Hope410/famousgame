import _ from 'lodash';

import Vector2D from '@/utils/Vector2D';

import * as ERRORS from '@/config/errors';
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

  private get initialTile() {
    const tile = this.tileMap.get(new Vector2D(0, 0).asKey());
    if (!tile) {
      throw new Error(ERRORS.NO_INITIAL_TILE);
    }

    return tile;
  }

  get isWin() {
    return _.every(
      [...this.tileMap.values()],
      (tile) => tile.color === this.initialTile.color
    );
  }
}
