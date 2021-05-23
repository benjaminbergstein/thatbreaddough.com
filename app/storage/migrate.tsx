import { Storage } from './types'
import { Storage as StorageV2 } from './v2/types'
import { Storage as StorageV3 } from './v3/types'

const v1: (timer: Storage) => StorageV2 = (timer) => {
  if (Object.keys(timer).indexOf('version') >= 0) return timer as StorageV2

  return {
    version: 'v2',
    timer
  } as StorageV2
}

const v2: (timer: StorageV2) => StorageV3 = (timer) => {
  return {
    ...timer,
    version: 'v3',
  } as StorageV3
}

const runMigrations = (storage: Storage | StorageV2): StorageV3 => {
  return v2(v1(storage))
}

export default runMigrations
