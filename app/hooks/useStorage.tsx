import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'

import { StorageVersion } from '../storage/types'
import { BreadTimer, Storage, Recipe, RecipePercentInput } from '../storage/v3/types'
import runMigrations from '../storage/migrate'

type TimerUpdater = (timer: BreadTimer) => void
type UseStorageHookReturn = [Storage, TimerUpdater | null, StorageVersion, boolean]

const CurrentVersion: StorageVersion = 'v3'
const useTimerState = createPersistedState('bread-timer')
const NewTimer: Storage = { version: CurrentVersion, timer: [] }

const useStorage = () => {
  const [_storage, setStorage] = useTimerState<Storage>(NewTimer)
  const needsMigration = _storage.version !== CurrentVersion

  const storage = needsMigration ? runMigrations(_storage) : _storage

  const setTimer = (timer: BreadTimer): void => {
    setStorage({
      ...storage,
      timer,
    })
  }

  const setRecipe =  (recipe: Recipe, recipeInput: RecipePercentInput): void => {
    setStorage({
      ...storage,
      recipe,
      recipeInput,
    })
  }

  return [storage, setTimer, setRecipe]
}

export default useStorage
