export enum Rating {
  EXPLICIT = 'EXPLICIT',
  SAFE = 'SAFE',
  QUESTIONABLE = 'QUESTIONABLE',
  ANY = 'ANY',
}

export type RatingTitle = `${Rating}`;
