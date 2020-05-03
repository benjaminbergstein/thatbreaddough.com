import React, { useState, useEffect } from 'react'
import { Text } from 'grommet'

import {
  formatElapsed,
  humanizeType,
  getEventInfo,
} from '../../../utils/timer'

import {
  EventType,
  RawEvent,
  NullEvent
} from '../../../storage/v2/types'

import Unstarted from './Unstarted'
import Started from './Started'

interface Props {
  startEvent: RawEvent | NullEvent
  endEvent?: RawEvent | NullEvent
  targetEvent: RawEvent | NullEvent
  captureEvent: (type: EventType) => void
  disabled?: boolean | 'auto'
  i?: number | null
}

const Step: React.FC<Props> = ({
  startEvent,
  endEvent,
  targetEvent,
  captureEvent,
  disabled: disabledSetting,
  i = null,
}) => {
  const {
    eventType,
    occurredAt,
    startedAt,
    endedAt,
    isDoneEvent,
    hasEnded,
    wasStarted,
    wasSkipped,
  } = getEventInfo(targetEvent, startEvent, endEvent)

  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    setDisabled(disabledSetting === true || (
      disabledSetting === 'auto' && !startEvent.occurredAt
    ))
  }, [startEvent.occurredAt, disabledSetting])

  const header = <Text weight="bold" color="neutral-3">
    <span style={{ whiteSpace: 'nowrap', textDecoration: wasSkipped ? 'line-through' : 'none' }}>
      {humanizeType(eventType, i)}
    </span>
  </Text>

  if (wasStarted) return (
    <Started {...{
      startedAt,
      endedAt,
      occurredAt,
      hasEnded,
      isDoneEvent,
    }}>{header}</Started>
  )

  return (
    <Unstarted {...{
      eventType,
      disabled,
      wasSkipped,
      captureEvent,
    }}>{header}</Unstarted>
  )
}

export default Step
