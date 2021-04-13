import _ from 'lodash';

import TileSet from '@/domain/TileSet';

import { ISolver, ISolverOptions } from './interfaces';

export default class AISolver implements ISolver {
  score: number = 0;

  options: ISolverOptions;

  constructor(options: ISolverOptions) {
    this.options = options;
  }

  step(color: string) {
    const { game, onStep } = this.options;

    game.tileGroup.setColor(color);
    this.score += 1;

    onStep(this.score);
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
        onSolve(this.score);
      }
    }, 1000);
  }
}
