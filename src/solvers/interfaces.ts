import Game from '@/domain/Game';

export interface ISolverOptions {
  game: Game;
  onStep(score: number): void;
  onSolve(score: number): void;
}

export interface ISolver {
  score: number;
  options: ISolverOptions;
  step(color: string): void;
  solve(): void;
}
