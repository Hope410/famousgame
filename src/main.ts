import Game from '@/domain/Game';

import * as ERRORS from '@/config/errors';
import { TILE_COLORS, TILE_MAP_SIZE, TILE_SIZE } from '@/config/settings';

import AISolver from './solvers/AISolver';
import { ISolver, ISolverOptions } from './solvers/interfaces';
import PlayerSolver from './solvers/PlayerSolver';
import SolverContext from './solvers/SolverContext';
import GameView from './view/GameView';

import '@/assets/style/index.css';

(function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
  const startBtn = document.querySelector<HTMLButtonElement>('#start-btn');
  const solverSelect = document.querySelector<HTMLSelectElement>(
    '#solver-select'
  );
  const colorsContainer = document.querySelector<HTMLDivElement>(
    '#colors-container'
  );
  const scoreValueEl = document.querySelector<HTMLDivElement>('#score-value');

  if (!canvas) {
    throw new Error(ERRORS.CANVAS_NOT_FOUND);
  }
  if (!startBtn) {
    throw new Error(ERRORS.START_BTN_NOT_FOUND);
  }
  if (!solverSelect) {
    throw new Error(ERRORS.SOLVER_SELECT_NOT_FOUND);
  }
  if (!colorsContainer) {
    throw new Error(ERRORS.COLORS_CONTAINER_NOT_FOUND);
  }
  if (!scoreValueEl) {
    throw new Error(ERRORS.SCORE_VALUE_NOT_FOUND);
  }

  canvas.width = TILE_MAP_SIZE[0] * TILE_SIZE;
  canvas.height = TILE_MAP_SIZE[1] * TILE_SIZE;

  TILE_COLORS.forEach((color) => {
    const colorEl = document.createElement('div');
    colorEl.setAttribute('data-value', color);
    colorEl.classList.add('game__color');
    colorEl.style.background = color;

    colorsContainer.appendChild(colorEl);
  });

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error(ERRORS.CANT_ACCESS_CTX);
  }

  const game = new Game({
    mapSize: TILE_MAP_SIZE,
    colors: TILE_COLORS,
  });

  const gameView = new GameView(ctx, {
    tileSize: TILE_SIZE,
  });

  const solverOptions: ISolverOptions = {
    game,
    onStep: (score) => {
      scoreValueEl.innerText = score.toString();
      gameView.render(game);
    },
    onSolve: (score) => alert(`Game Solved! Score: ${score}`),
  };

  const solvers: Record<string, ISolver> = {
    ai: new AISolver(solverOptions),
    player: new PlayerSolver({
      ...solverOptions,
      colorsContainer,
    }),
  };

  const solverContext = new SolverContext();

  gameView.render(game);

  startBtn.addEventListener('click', () => {
    solverContext.solve();
  });

  solverSelect.addEventListener('input', () => {
    solverContext.setSolver(solvers[solverSelect.value]);
  });
})();
