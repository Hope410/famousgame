export const DELIMITER = '.';
export const TILE_MAP_SIZE = [8, 8] as const;
export const TILE_SIZE = 16;
export const TILE_COLORS = [
  '#6D8C81',
  '#F2E0D0',
  '#F2AD94',
  '#D96459',
  '#8C4949',
];

export const ERRORS = {
  INVALID_KEY_PARTS: 'Invalid key: some parts of key is NaN',
  INVALID_KEY_LENGHT: 'Invalid key: key parts length must be equal to 2',
  NO_INITIAL_TILE:
    "Can't get initial tile: tile map is empty - check tile map size",
  CANT_GET_TILE: "Can't get tile with position {position}",
};
