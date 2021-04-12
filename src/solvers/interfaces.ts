import Game from '@/domain/Game';

export interface ISolverOptions {
  game: Game;
  onStep(): void;
  onSolve(): void;
}

export interface ISolver {
  options: ISolverOptions;
  step(color: string): void;
  solve(): void;
}
