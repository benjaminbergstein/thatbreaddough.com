export interface Recipe {
  flour: number,
  water: number,
  starter: number,
  salt: number,
  totalDoughWeight: number,
};

export interface RecipePercentInput {
  totalDoughWeight: number,
  hydrationPercent: number,
  starterPercent: number,
  saltPercent: number,
  scale: number,
  yield: string,
};
