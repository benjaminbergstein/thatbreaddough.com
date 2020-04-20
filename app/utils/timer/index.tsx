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
  desiredType: EventType,
  timer: BreadTimer
) => RawEvent | NullEvent = (desiredType, timer) => (
  timer.find(({ type }) => desiredType === type) ||
  { type: desiredType, occurredAt: null }
)

export const filterForType: (
  desiredType: EventType,
  timer: BreadTimer
) => RawEvent[] = (desiredType, timer) =>
  timer.filter(({ type }) => desiredType === type)

export const hasEvent: (
  timer: BreadTimer,
  eventType: EventType
) => boolean = (timer) => firstEvent(EventType.START, timer).occurredAt !== null

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

// interface FoldInfo {
//   fold: RawEvent,
//   prevFold: 
// }
// export const getFolds: (
//   timer: BreadTimer
// ): RawEvent[] = (timer) => {
//   const mixEvent = firstEvent(EventType.MIX, timer)
//   if (!mixEvent) return []
//   const folds = filterForType(FOLD, timer).reduce(([folds, prevFold], fold) => {
//     return []
//   }, [[], mixEvent])
// }
