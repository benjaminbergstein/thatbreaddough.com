import {
  BreadTimer,
  EventType,
  RawEvent,
  NullEvent,
} from '../../storage/v2/types'

import {
  filterForType,
} from '../../utils/timer'

import Step from './Step'

interface Props {
  timer: BreadTimer
  eventType: EventType
  disabled: boolean
  hiddenByEvent: RawEvent
  startEvent: RawEvent
  defaultPreviousEvent: RawEvent
  defaultNextEvent: RawEvent
  captureEvent: (type: EventType) => void
}

const MultiStep: React.FC<Props> = ({
  timer,
  eventType,
  disabled,
  hiddenByEvent,
  startEvent,
  defaultPreviousEvent,
  defaultNextEvent,
  captureEvent,
}) => {
  const events = !disabled ? filterForType(timer, eventType) : []
  const eventCount = events.length

  return <>
    {events.map((event, index) => (
      <Step
        key={`event-${event.type}-${index}`}
        startEvent={index === 0 ? defaultPreviousEvent : events[index - 1]}
        endEvent={eventCount === index + 1 ? defaultNextEvent : events[index + 1]}
        targetEvent={event}
        captureEvent={captureEvent}
        i={index + 1}
      />
    ))}
    {hiddenByEvent.occurredAt === null && <Step
      startEvent={startEvent}
      targetEvent={{ type: eventType, occurredAt: null}}
      captureEvent={captureEvent}
      disabled={disabled}
    />}
  </>
}

export default MultiStep
