import React from 'react'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import { Text, Button } from 'grommet'

import {
  BreadTimer,
  EventType,
  RawEvent,
  NullEvent,
} from '../../storage/v2/types'

import {
  filterForType,
  humanizeType,
} from '../../utils/timer'

import Step from './Step'

interface Props {
  timer: BreadTimer
  eventTypes: EventType[]
  disabled: boolean
  hiddenByEvent: RawEvent
  startEvent: RawEvent
  defaultPreviousEvent: RawEvent
  defaultNextEvent: RawEvent
  captureEvent: (type: EventType) => void
  forceButtons?: boolean
  limit?: number | null
  showNothingRecordedMessage?: boolean
}

const MultiStep: React.FC<Props> = ({
  timer,
  eventTypes,
  disabled,
  hiddenByEvent,
  startEvent,
  defaultPreviousEvent,
  defaultNextEvent,
  captureEvent,
  forceButtons = false,
  limit = null,
  showNothingRecordedMessage = false,
}) => {
  const isMultiple = eventTypes.length > 1
  const events = !disabled ? filterForType(timer, eventTypes) : []
  const eventCount = events.length

  const hasHiddenByEventOccurred = hiddenByEvent.occurredAt !== null
  const limitReached = limit !== null && events.length === limit
  const showAddEvent = !hasHiddenByEventOccurred  && !limitReached
  const addEvent = isMultiple || forceButtons ? (
    <Text>
      {eventTypes.map((eventType) => (
        <Button
          key={`add-evt-${eventType}`}
          color='neutral-3'
          primary
          disabled={disabled}
          onClick={() => captureEvent(eventType)}
          icon={<FaPlus />}
          label={`${humanizeType(eventType)}`}
          size="small"
          margin={{ bottom: 'small', right: 'small' }}
        />
      ))}
    </Text>
  ) : (
    <Step
      startEvent={startEvent}
      targetEvent={{ type: eventTypes[0], occurredAt: null}}
      captureEvent={captureEvent}
      disabled={disabled}
    />
  )

  const counts: { [eventType: string]: number } = {}
  const getCount: (eventType: EventType) => number = (eventType) => {
    if (!counts[eventType]) counts[eventType] = 0
    counts[eventType] = counts[eventType] + 1
    return counts[eventType]
  }

  return <>
    {(showNothingRecordedMessage === true && hasHiddenByEventOccurred && events.length === 0) && (
      <Text color="neutral-3" weight="bold">Nothing recorded.</Text>
    )}
    {events.map((event, index) => (
      <Step
        key={`event-${event.type}-${index}`}
        startEvent={index === 0 ? defaultPreviousEvent : events[index - 1]}
        endEvent={eventCount === index + 1 ? defaultNextEvent : events[index + 1]}
        targetEvent={event}
        captureEvent={captureEvent}
        i={limit === 1 ? undefined : getCount(event.type)}
      />
    ))}
    {showAddEvent && addEvent}
  </>
}

export default MultiStep
