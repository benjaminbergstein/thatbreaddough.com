import { Recipe, RecipePercentInput } from './types';

const percent = (p: number) => p / 100;

export const recipeFromInput = (recipeInput: Omit<RecipePercentInput,'yield'>) => {
  const {
    totalDoughWeight,
    hydrationPercent,
    starterPercent,
    saltPercent,
    scale,
  } = recipeInput;

  const scaledDoughWeight = totalDoughWeight * scale / 100;
  const salt : number = (percent(percent(saltPercent) * scaledDoughWeight) / (1 + percent(percent((saltPercent)))))
  const coreIngredientWeight : number = scaledDoughWeight- salt;
  const dryWeight : number = coreIngredientWeight / (1 + percent(hydrationPercent));
  const wetWeight : number = coreIngredientWeight - dryWeight;
  const flourWeight : number = dryWeight / (1 + percent(starterPercent));
  const starter : number = (dryWeight - flourWeight) * 2
  const waterWeight : number = wetWeight - (starter / 2);

  const recipe : Recipe = {
    flour: Math.round(flourWeight),
    water: Math.round(waterWeight),
    starter: Math.round(starter),
    salt: Math.round(salt),
    totalDoughWeight: Math.round(flourWeight + waterWeight + starter + salt),
  };

  return recipe;
}
