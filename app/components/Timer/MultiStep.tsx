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
}) => {
  const isMultiple = eventTypes.length > 1
  const events = !disabled ? filterForType(timer, eventTypes) : []
  const eventCount = events.length

  const showAddEvent = hiddenByEvent.occurredAt === null
  const addEvent = isMultiple ? (
    <Text margin={{ vertical: 'small' }}>
      {eventTypes.map((eventType) => (
        <Button
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
    {showAddEvent && addEvent}
  </>
}

export default MultiStep
