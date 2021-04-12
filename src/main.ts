import { TILE_MAP_SIZE, TILE_SIZE } from '@/config';

(function main() {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
  if (!canvas) {
    throw new Error('Canvas not found');
  }

  canvas.width = TILE_MAP_SIZE[0] * TILE_SIZE;
  canvas.height = TILE_MAP_SIZE[1] * TILE_SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error("Can't access Canvas Rendering Context");
  }
})();
