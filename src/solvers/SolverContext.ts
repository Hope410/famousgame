import * as ERRORS from '@/config/errors';

import { ISolver } from './interfaces';

export default class SolverContext {
  private solver?: ISolver;

  public setSolver(solver: ISolver) {
    this.solver = solver;
  }

  public solve() {
    if (!this.solver) {
      throw new Error(ERRORS.SOLVER_DIDNT_SET);
    }

    this.solver.solve();
  }
}
