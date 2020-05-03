import { Storage } from './types'
import { BreadTimer as StorageV1 } from './v1/types'
import { Storage as StorageV2 } from './v2/types'

const v1: (timer: Storage) => StorageV2 = (timer) => {
  if (Object.keys(timer).indexOf('version') >= 0) return timer as StorageV2

  return {
    version: 'v2',
    timer,
  } as StorageV2
}

const runMigrations: (storage: Storage) => StorageV2 = v1

export default runMigrations
