import { RecipePercentInput } from './types';

export const Recipes: { [index:string] : RecipePercentInput } = {
  sourdoughLoaf: {
    totalDoughWeight: 950,
    hydrationPercent: 78,
    starterPercent: 15,
    saltPercent: 180,
    scale: 100,
    yield: 'One dough ball',
  },
  sourdoughLoafPan: {
    totalDoughWeight: 1250,
    hydrationPercent: 69,
    starterPercent: 8,
    saltPercent: 125,
    scale: 100,
    yield: 'One loaf',
  },
  pizzaDough: {
    totalDoughWeight: 1000,
    hydrationPercent: 68,
    starterPercent: 10,
    saltPercent: 150,
    scale: 100,
    yield: 'Four 250g dough balls',
  },
};

