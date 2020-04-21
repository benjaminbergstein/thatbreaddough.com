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

import Clock from './Clock'

const Step: React.FC<any> = ({
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

  const wasStarted = !!occurredAt
  const wasSkipped = hasEnded && !occurredAt && !isDoneEvent

  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    setDisabled(disabledSetting === true || (
      disabledSetting === 'auto' && !startEvent.occurredAt
    ))
  }, [startEvent.occurredAt, disabledSetting])

  const header = <Text weight="bold" color="neutral-3">
    <span style={{ whiteSpace: 'nowrap' }}>
      {`${eventType[0].toUpperCase()}${eventType.substr(1)}`}
    </span>
  </Text>

  if (wasStarted) return (
    <Box
      background="white"
      elevation="xsmall"
      border={{ color: 'light-1' }}
      round='xsmall'
      pad="medium"
      margin={{ bottom: "medium" }}
    >
      <Box>
        {header}
      </Box>
      <Grid
        margin={{ top: 'small' }}
        columns={['1/2', '1/2']}
        rows={["auto"]}
      >
        <Box><Text color="dark-3" size="small">start</Text></Box>
        <Box><Text color="dark-3" size="small">elapsed</Text></Box>

        <Box>
          <Text color="dark-2">
            {wasSkipped === false && (wasStarted ? <Clock start={startedAt} end={occurredAt} /> : '-')}
            {wasSkipped && <Text size="small" color="dark-4">
              <FaStepForward />
            </Text>}
          </Text>
        </Box>

        <Box>
          <Text color="dark-2">
            {!isDoneEvent && wasStarted && <Clock start={occurredAt} end={endedAt} />}
            {(isDoneEvent || (!wasStarted && wasSkipped !== true)) && '-'}
            {!wasSkipped && hasEnded && <Text size="small" color="green">
              <span>&nbsp;&nbsp;</span><FaCheckCircle />
            </Text>}
          </Text>

          {wasSkipped && <Text size="small" color="dark-4">
            <span>skipped</span>
          </Text>}
        </Box>
      </Grid>
    </Box>
  )

  return (
    <Box
      background="white"
      elevation="xsmall"
      border={{ color: 'light-1' }}
      round='xsmall'
      pad={{ vertical: "small", horizontal: "medium" }}
      margin={{ bottom: "medium" }}
    >
      <Grid columns={["flex", "flex"]}>
        <Box justify="center">
          {header}
        </Box>

        <Box align="end" justify="end">
          <Text>
            <Button
              disabled={disabled}
              color="accent-1"
              icon={<FaPlay />}
              onClick={() => captureEvent(eventType)}
            />
          </Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default Step
