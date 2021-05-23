import React from 'react'
import styled from 'styled-components'
import { FaPlus } from 'react-icons/fa'
import { Box, Text } from '../System'
import Button from '../System/Button'

import {
  BreadTimer,
  EventType,
  RawEvent,
  NullEvent,
  EventGroups,
} from '../../storage/v2/types'

import {
  filterForType,
  humanizeType
} from '../../utils/timer'

import Step from './Step'

interface Props {
  timer: BreadTimer;
  eventTypes: EventType[];
  disabled: boolean;
  hiddenByEvent: RawEvent;
  startEvent: RawEvent;
  defaultPreviousEvent: RawEvent;
  defaultNextEvent: RawEvent;
  captureEvent: (type: EventType) => void;
  forceButtons?: boolean;
  limit?: number | null;
  showNothingRecordedMessage?: boolean;
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
  showNothingRecordedMessage = false
}) => {
  const isMultiple = eventTypes.length > 1
  const events = !disabled ? filterForType(timer, eventTypes) : []
  const eventCount = events.length

  const hasHiddenByEventOccurred = hiddenByEvent.occurredAt !== null
  const limitReached = limit !== null && events.length === limit
  const showAddEvent = !hasHiddenByEventOccurred && !limitReached
  const addEvent = isMultiple || forceButtons ? (
    <Box display="flex" flexWrap="wrap" flexDirection="row">
      {eventTypes.map((eventType) => (
        <Button
          size="small"
          icon="add"
          marginRight={1}
          marginBottom={2}
          key={`add-evt-${eventType}`}
          disabled={disabled}
          onClick={() => captureEvent(eventType)}
        >
          {`${humanizeType(eventType)}`}
        </Button>
      ))}
    </Box>
  ) : (
    <Step
      startEvent={startEvent}
      targetEvent={{ type: eventTypes[0], occurredAt: null }}
      captureEvent={captureEvent}
      disabled={disabled}
    />
  )

  const counts: { [eventType: string]: number } = {}
  const getCount: (eventType: EventType) => number = (eventType) => {
    const group = EventGroups[eventType] || eventType
    if (!counts[group]) counts[group] = 0
    counts[group] = counts[group] + 1
    return counts[group]
  }

  return <>
    {(showNothingRecordedMessage === true && hasHiddenByEventOccurred && events.length === 0) && (
      <Text color="neutral-3" weight="bold">Nothing recorded.</Text>
    )}
    {events.map((event, index) => {
      const count = getCount(event.type)
      return (
        <Step
          key={`event-${event.type}-${count}`}
          startEvent={index === 0 ? defaultPreviousEvent : events[index - 1]}
          endEvent={eventCount === index + 1 ? defaultNextEvent : events[index + 1]}
          targetEvent={event}
          captureEvent={captureEvent}
          i={limit === 1 ? undefined : count}
        />
      )
    })}
    {showAddEvent && addEvent}
  </>
}

export default MultiStep
