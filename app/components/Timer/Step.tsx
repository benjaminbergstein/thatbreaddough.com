import React from 'react'
import { FaCheckCircle, FaStepForward } from 'react-icons/fa'
import {
  Text,
  Box,
  Button,
} from 'grommet'

import {
  formatElapsed,
} from '../../utils/timer'

import { EventType } from '../../utils/timer/types'

const Step: React.FC<any> = ({
  tick,
  startEvent,
  endEvent = { occurredAt: null },
  targetEvent,
  captureEvent,
  disabled: disabledSetting,
}) => {
  const { type: eventType, occurredAt } = targetEvent
  const isDoneEvent = eventType === EventType.END
  const { occurredAt: startedAt } = startEvent
  const { occurredAt: endedAt } = endEvent
  const sinceStart = occurredAt - startedAt
  const hasEnded = endedAt !== null || (occurredAt !== null && isDoneEvent)
  const elapsed = (endedAt || tick) - occurredAt

  const wasSkipped = hasEnded && !occurredAt && !isDoneEvent

  const disabled = disabledSetting === true || (
    disabledSetting === 'auto' && !startEvent.occurredAt
  )


  return (
    <>
      <Box height={{ min: "3rem" }} justify="center" align="center">
        {occurredAt === null && !wasSkipped && (
          <Button
            disabled={disabled}
            size="small"
            label={eventType}
            onClick={() => captureEvent(eventType)}
          />
        )}
        {(occurredAt !== null || wasSkipped) && <Text color="dark-2">
          {eventType}
        </Text>}
      </Box>

      <Box justify="center" align="center">
        <Text color="dark-2">
          {wasSkipped === false && (occurredAt !== null ? formatElapsed(sinceStart) : '-')}
          {wasSkipped && <Text size="small" color="dark-4">
            <FaStepForward />
          </Text>}
        </Text>
      </Box>
      <Box justify="center" align="center">
        <Text color="dark-2">
          {!isDoneEvent && occurredAt !== null && formatElapsed(elapsed)}
          {(isDoneEvent || (occurredAt === null && wasSkipped !== true)) && '-'}
          {!wasSkipped && hasEnded && <Text size="small" color="green">
            <span>&nbsp;&nbsp;</span><FaCheckCircle />
          </Text>}
        </Text>

        {wasSkipped && <Text size="small" color="dark-4">
          <span>skipped</span>
        </Text>}
      </Box>
    </>
  )
}

export default Step
