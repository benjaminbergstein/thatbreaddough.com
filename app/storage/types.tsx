import { BreadTimer } from './v1/types'
import { Storage as StorageV2 } from './v2/types'
import { Storage as StorageV3 } from './v3/types'

export type Storage = BreadTimer | StorageV2 | StorageV3
export type StorageVersion = undefined | 'v3'
