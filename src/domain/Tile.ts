import Vector2D from '@/utils/Vector2D';

interface TileOptions {
  position: Vector2D;
  color: string;
}

export default class Tile {
  position: Vector2D;

  color: string;

  constructor(options: TileOptions) {
    this.position = options.position;
    this.color = options.color;
  }

  setColor(color: string) {
    this.color = color;
  }
}
