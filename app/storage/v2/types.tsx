export type StorageVersion = 'v2'

export interface Storage {
  version: StorageVersion
  timer: BreadTimer
}

export enum EventType {
  NULL = 'null',
  START = 'start',
  FEED = 'feed',
  LEVAIN = 'levain build',
  AUTOLYSE = 'autolyse',
  SALT = 'salt added',
  MIX =  'levain mix',
  STRETCH_FOLD = 'stretch-&-fold',
  SLAP_FOLD = 'slap-&-fold',
  COIL_FOLD = 'coil-fold',
  LAMINATE = 'lamination',
  FOLD = 'fold',
  REST = 'rest',
  BULK = 'bulk',
  PRESHAPE = 'preshape',
  PROOF = 'proof',
  RETARD = 'retard',
  STEAM = 'bake with steam',
  BAKE = 'bake',
  COOL = 'cool',
  END = 'done',
}

export interface RawEvent {
  type: EventType
  occurredAt: number
}

export interface NullEvent {
  type: EventType
  occurredAt: null
}

export interface EventInfo extends RawEvent {
  eventType: EventType,
  startedAt: number,
  endedAt: number,
  isDoneEvent: boolean,
  hasEnded: boolean,
  wasStarted: boolean,
  wasSkipped: boolean,
}


export type BreadEvent = RawEvent | NullEvent
export type BreadTimer = RawEvent[]
