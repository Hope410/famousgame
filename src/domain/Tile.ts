import Vector2D from '@/utils/Vector2D';

interface TileOptions {
  position: Vector2D;
  color: string;
}

export default class Tile {
  public readonly position: Vector2D;

  public color: string;

  constructor(options: TileOptions) {
    this.position = options.position;
    this.color = options.color;
  }

  public setColor(color: string) {
    this.color = color;
  }
}
