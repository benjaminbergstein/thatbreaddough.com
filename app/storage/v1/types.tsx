export enum EventType {
  START = 'start',
  LEVAIN = 'levain build',
  AUTOLYSE = 'autolyse',
  SALT = 'salt added',
  MIX = 'levain mix',
  STRETCH_FOLD = 'stretch-fold',
  COIL_FOLD = 'coil-fold',
  LAMINATE = 'lamination',
  FOLD = 'fold',
  BULK = 'bulk',
  PRESHAPE = 'preshape',
  PROOF = 'proof',
  STEAM = 'bake with steam',
  BAKE = 'bake',
  COOL = 'cool',
  END = 'done',
}

export interface RawEvent {
  type: EventType;
  occurredAt: number;
}

export interface NullEvent {
  type: EventType;
  occurredAt: null;
}

export type BreadEvent = RawEvent | NullEvent
export type BreadTimer = RawEvent[]
