import { BreadTimer } from '../v1/types'
import { Storage as StorageV2 } from '../v2/types'

export type Storage = BreadTimer | StorageV2
export type StorageVersion = undefined | 'v2'
