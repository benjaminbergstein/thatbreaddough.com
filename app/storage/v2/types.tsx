export type StorageVersion = 'v2'

export interface Storage {
  version: StorageVersion;
  timer: BreadTimer;
}

export enum EventType {
  NULL = 'null',
  START = 'start',
  FEED = 'feed',
  LEVAIN = 'levain build',
  AUTOLYSE = 'autolyse',
  SALT = 'salt added',
  MIX = 'levain mix',
  STRETCH_FOLD = 'stretch-&-fold',
  SLAP_FOLD = 'slap-&-fold',
  COIL_FOLD = 'coil-fold',
  LAMINATE = 'lamination',
  FOLD = 'fold',
  RUBAUD = 'rubaud',
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

type EventGroup = 'strengthening'
export const EventGroups: Partial<Record<EventType,EventGroup>> = {
  [EventType.STRETCH_FOLD]: 'strengthening',
  [EventType.SLAP_FOLD]: 'strengthening',
  [EventType.COIL_FOLD]: 'strengthening',
  [EventType.LAMINATE]: 'strengthening',
  [EventType.FOLD]: 'strengthening',
  [EventType.RUBAUD]: 'strengthening',
}

export type RawEvent = {
  type: EventType;
  occurredAt: number;
}

export interface NullEvent {
  type: EventType;
  occurredAt: null;
}

export const nullEvent: NullEvent = {
  type: EventType.NULL,
  occurredAt: null
}

export interface EventInfo extends RawEvent {
  eventType: EventType;
  startedAt: number;
  endedAt: number;
  isDoneEvent: boolean;
  hasEnded: boolean;
  wasStarted: boolean;
  wasSkipped: boolean;
}

export type BreadEvent = RawEvent | NullEvent
export type BreadTimer = RawEvent[]
