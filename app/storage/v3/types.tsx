export type StorageVersion = 'v3'

import {
  Storage as StorageV2,
} from '../v2/types'

import { Recipe, RecipePercentInput } from '../../utils/calculator/types'

export type { Recipe, RecipePercentInput } from '../../utils/calculator/types'
export type { BreadTimer } from '../v2/types'

export interface Storage extends Omit<StorageV2,'version'> {
  version: StorageVersion
  recipe?: Recipe
  recipeInput?: RecipePercentInput
}
