import {
  EventType,
  BreadTimer,
  RawEvent,
  EventInfo,
  NullEvent,
} from '../../storage/v2/types'

export const formatElapsed: (number) => string = (elapsed) => {
  const pad: (number) => string = (num) => num.toString().padStart(2, '0')
  const milli = elapsed % 1000
  const seconds = Math.floor(elapsed / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return `${pad(hours % 24)}:${pad(minutes % 60)}:${pad(seconds % 60)}`
}

export const getEventInfo: (
  event: RawEvent,
  startEvent: RawEvent,
  endEvent?: RawEvent,
) => EventInfo = (
  event,
  startEvent,
  endEvent = { occurredAt: null, type: EventType.NULL }
) => {
  const { type: eventType, occurredAt } = event
  const { occurredAt: startedAt } = startEvent
  const { occurredAt: endedAt } = endEvent ? endEvent : { occurredAt: null }

  const isDoneEvent = eventType === EventType.END
  const hasEnded = endedAt !== null || (occurredAt !== null && isDoneEvent)
  const wasStarted = !!occurredAt
  const wasSkipped = hasEnded && !occurredAt && !isDoneEvent

  return {
    type: eventType,
    eventType,
    occurredAt,
    startedAt,
    endedAt,
    isDoneEvent,
    hasEnded,
    wasStarted,
    wasSkipped,
  }
}

export const humanizeType: (
  eventType: EventType,
  i?: number
) => string = (eventType, i = null) => {
  const humanized = `${eventType[0].toUpperCase()}${eventType.substr(1)}`.replace(/-/g, ' ')
  const num = `${i !== null ? ` ${i}` : ''}`
  return `${humanized} ${num}`
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
  desiredTypes: EventType[]
) => RawEvent[] = (timer, desiredTypes) =>
  timer.filter(({ type }) => desiredTypes.indexOf(type) >= 0)

export const someEvent: (
  timer: BreadTimer,
  eventTypes: EventType[]
) => boolean = (timer, eventTypes) =>
  filterForType(timer, eventTypes).length > 0

export const hasEvent: (
  timer: BreadTimer,
  eventType: EventType
) => boolean = (timer, eventType) =>
  firstEvent(timer, eventType).occurredAt !== null

export const isNullEvent: (event: RawEvent) => boolean = (event) => (
  event === undefined ||
  event === null ||
  event.occurredAt === null ||
  event.type === EventType.NULL
)

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
