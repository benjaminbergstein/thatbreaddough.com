import { Storage } from './types'
import { BreadTimer as StorageV1 } from './v1/types'
import { Storage as StorageV2 } from './v2/types'

type MigrationFunction = (timer: Storage) => Storage
type MigrationTest = (timer: Storage) => boolean

interface Migration {
  test: MigrationTest
  perform: MigrationFunction
}

const v1: Migration = {
  test: (timer) => !timer.version,
  perform: (timer) => ({
    version: 'v2',
    timer,
  }),
}

const runMigrations: (storage: Storage) => Storage = (storage) => {
  const { test, perform } = v1
  if (test(storage)) return perform(storage)
  return storage
}

export default runMigrations
