import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'

import { StorageVersion } from '../storage/types'
import { BreadTimer, Storage } from '../storage/v2/types'
import runMigrations from '../storage/migrate'

type TimerUpdater = (timer: BreadTimer) => void
type UseStorageHookReturn = [Storage, TimerUpdater | null, StorageVersion, boolean]

const CurrentVersion: StorageVersion = 'v2'
const useTimerState = createPersistedState('bread-timer')

const useStorage = () => {
  const [storage, setStorage] = useTimerState<Storage>({ version: 'v2', timer: [] })
  const needsMigration = storage.version !== CurrentVersion

  useEffect(() => {
    if (!needsMigration) return
    setStorage(runMigrations(storage))
  })

  if (needsMigration) return [null, storage, CurrentVersion, true]

  const setTimer: (timer: BreadTimer) => void = (timer: BreadTimer) => {
    setStorage({
      ...storage,
      timer,
    })
  }

  return [storage, setTimer, CurrentVersion, false]
}

export default useStorage
