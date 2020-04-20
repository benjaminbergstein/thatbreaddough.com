import {
  EventType,
  BreadTimer,
  RawEvent,
  NullEvent,
} from './types'

export const formatElapsed: (number) => string = (elapsed) => {
  const pad: (number) => string = (num) => num.toString().padStart(2, '0')
  const milli = elapsed % 1000
  const seconds = Math.floor(elapsed / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes/ 60)
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milli}`
}

export const firstEvent: (
  timer: BreadTimer,
  desiredType: EventType
) => RawEvent | NullEvent = (timer, desiredType) => (
  timer.find(({ type }) => desiredType === type) ||
  { type: desiredType, occurredAt: null }
)

export const filterForType: (
  timer: BreadTimer,
  desiredType: EventType
) => RawEvent[] = (timer, desiredType) =>
  timer.filter(({ type }) => desiredType === type)

export const hasEvent: (
  timer: BreadTimer,
  eventType: EventType
) => boolean = (timer, eventType) =>
  firstEvent(timer, eventType).occurredAt !== null

export const addEvent: (
  timer: BreadTimer,
  eventType: EventType
) => BreadTimer = (timer, eventType) => {
  const occurredAt = +new Date()
  const baseTimer: BreadTimer = !hasEvent(timer, EventType.START) ? [{ type: EventType.START, occurredAt }] : timer

  return [
    ...baseTimer,
    { type: eventType, occurredAt },
  ]
}
