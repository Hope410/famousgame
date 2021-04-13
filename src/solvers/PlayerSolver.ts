import * as ERRORS from '@/config/errors';

import { ISolver, ISolverOptions } from './interfaces';

interface PlayerSolverOptions extends ISolverOptions {
  colorsContainer: HTMLDivElement;
}

export default class PlayerSolver implements ISolver {
  score: number = 0;

  options: PlayerSolverOptions;

  constructor(options: PlayerSolverOptions) {
    this.options = options;
  }

  step(color: string) {
    const { game, onStep } = this.options;

    game.tileGroup.setColor(color);
    this.score += 1;

    onStep(this.score);
  }

  onColorClick(evt: Event) {
    const colorEl = evt.target as HTMLDivElement;
    const { game, onSolve } = this.options;
    const colorValue = colorEl.getAttribute('data-value');

    if (!colorValue) {
      throw new Error(ERRORS.CANT_GET_COLOR_VALUE);
    }

    this.step(colorValue);
    if (game.isWin) {
      onSolve(this.score);
      colorEl.removeEventListener('click', this.onColorClick.bind(this));
    }
  }

  solve() {
    const { colorsContainer } = this.options;
    const colors = colorsContainer.querySelectorAll('.game__color');

    colors.forEach((colorEl) => {
      colorEl.addEventListener('click', this.onColorClick.bind(this));
    });
  }
}
