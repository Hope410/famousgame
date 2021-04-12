import _ from 'lodash';

import { DELIMITER, ERRORS } from '@/config';
import { Tuple2D } from '@/types';

export default class Vector2D {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromKey(key: string) {
    const parts = key.split(DELIMITER).map(Number);

    if (_.some(parts, _.isNaN)) {
      throw new TypeError(ERRORS.INVALID_KEY_PARTS);
    }

    if (parts.length !== 2) {
      throw new TypeError(ERRORS.INVALID_KEY_LENGHT);
    }

    return new Vector2D(...(parts as Tuple2D<number>));
  }

  static fromTuple(tuple: Tuple2D<number>): Vector2D {
    return new Vector2D(...tuple);
  }

  static get top(): Vector2D {
    return new Vector2D(0, -1);
  }

  static get right(): Vector2D {
    return new Vector2D(1, 0);
  }

  static get bottom(): Vector2D {
    return new Vector2D(0, 1);
  }

  static get left(): Vector2D {
    return new Vector2D(-1, 0);
  }

  static get directions() {
    return [
      Vector2D.top,
      Vector2D.right,
      Vector2D.bottom,
      Vector2D.left,
    ] as const;
  }

  asKey(): string {
    return this.asTuple().join(DELIMITER);
  }

  asTuple(): Tuple2D<number> {
    return [this.x, this.y];
  }

  add(vec: Vector2D): Vector2D {
    return new Vector2D(this.x + vec.x, this.y + vec.y);
  }

  subtract(vec: Vector2D): Vector2D {
    return new Vector2D(this.x - vec.x, this.y - vec.y);
  }
}
