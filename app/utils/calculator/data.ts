import { RecipePercentInput } from './types';

export const Recipes: { [index:string] : RecipePercentInput } = {
  sourdoughLoaf: {
    totalDoughWeight: 1970,
    hydrationPercent: 77,
    starterPercent: 10,
    saltPercent: 100,
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

