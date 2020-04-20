export enum EventType {
  START = 'start',
  LEVAIN = 'levain build',
  AUTOLYSE = 'autolyse',
  SALT = 'salt',
  MIX =  'levain added',
  FOLD = 'fold',
}

export interface RawEvent {
  type: EventType
  occurredAt: number
}

export interface NullEvent {
  type: EventType
  occurredAt: null
}

export type BreadEvent = RawEvent | NullEvent
export type BreadTimer = RawEvent[]
