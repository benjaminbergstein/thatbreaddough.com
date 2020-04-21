import React, { useState, useEffect } from 'react'
import { FaPlay, FaCheckCircle, FaStepForward } from 'react-icons/fa'
import {
  Grid,
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

  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    setDisabled(disabledSetting === true || (
      disabledSetting === 'auto' && !startEvent.occurredAt
    ))
  }, [tick])

  return (
    <>
      <Box fill height={{ min: "3rem" }} justify="center" align="center">
        <Grid columns={["flex", "flex"]} justify="center" align="center">
          <Box><span style={{ whiteSpace: 'nowrap' }}>{eventType}</span></Box>
          <Box>
            {occurredAt === null && !wasSkipped && (
              <Button
                disabled={disabled}
                color="accent-1"
                size="small"
                plain={undefined}
                primary
                icon={<FaPlay />}
                onClick={() => captureEvent(eventType)}
              />
            )}
          </Box>
        </Grid>
      </Box>

      <Box justify="center" align="center">
        <Text color="dark-2">
          {wasSkipped === false && (occurredAt !== null ? formatElapsed(sinceStart) : '-')}
          {wasSkipped && <Text size="small" color="dark-4">
            <FaStepForward />
          </Text>}
        </Text>
      </Box>
      <Box justify="center" align="start">
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
