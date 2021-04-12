import Game from '@/domain/Game';

interface GameViewOptions {
  tileSize: number;
}

export default class GameView {
  ctx: CanvasRenderingContext2D;

  options: GameViewOptions;

  constructor(ctx: CanvasRenderingContext2D, options: GameViewOptions) {
    this.ctx = ctx;
    this.options = options;
  }

  render(game: Game) {
    game.tileMap.forEach((tile) => {
      const { tileSize } = this.options;
      const [x, y] = tile.position.asTuple().map((v) => v * tileSize);

      this.ctx.fillStyle = tile.color;
      this.ctx.fillRect(x, y, tileSize, tileSize);
    });
  }
}
