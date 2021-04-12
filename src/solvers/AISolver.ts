import _ from 'lodash';

import TileSet from '@/domain/TileSet';

import { ISolver, ISolverOptions } from './interfaces';

export default class AISolver implements ISolver {
  options: ISolverOptions;

  constructor(options: ISolverOptions) {
    this.options = options;
  }

  step(color: string) {
    const { game, onStep } = this.options;

    game.tileGroup.setColor(color);
    onStep();
  }

  solve() {
    const solveInterval = setInterval(() => {
      const { game, onSolve } = this.options;
      const neighbors = new TileSet();

      game.tileGroup.forEach((tile) => {
        game.tileMap
          .neighborsFor(tile)
          .filter((neighbor) => !game.tileGroup.get(neighbor.position.asKey()))
          .forEach((neighbor) =>
            neighbors.set(neighbor.position.asKey(), neighbor)
          );
      });

      const colorGroups = _([...neighbors.values()])
        .groupBy('color')
        .toPairs()
        .maxBy((entrie) => entrie[1].length);

      if (!colorGroups) {
        throw new Error("Can't compute color groups");
      }

      const [color] = colorGroups;

      this.step(color);

      if (game.isWin) {
        clearInterval(solveInterval);
        onSolve();
      }
    }, 1000);
  }
}
