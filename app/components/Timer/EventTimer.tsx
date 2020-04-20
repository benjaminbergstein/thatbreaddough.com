import React from 'react'
import {
  Text,
  Box,
  Button,
} from 'grommet'

import {
  formatElapsed,
} from '../../utils/timer'

const EventTimer: React.FC<any> = ({
  tick,
  startEvent,
  endEvent = { occurredAt: null },
  targetEvent,
  captureEvent,
  disabled: disabledSetting,
}) => {
  const { type: eventType, occurredAt } = targetEvent
  const { occurredAt: startedAt } = startEvent
  const { occurredAt: endedAt } = endEvent
  const sinceStart = occurredAt - startedAt
  const hasEnded = endedAt !== null
  const elapsed = (endedAt || tick)- occurredAt

  const disabled = disabledSetting === true || (
    disabledSetting === 'auto' && !startEvent.occurredAt
  )

  return (
    <>
      <Box height={{ min: "3rem" }} justify="center" align="center">
        {occurredAt === null && (
          <Button
            disabled={disabled}
            size="small"
            label={eventType}
            onClick={() => captureEvent(eventType)}
          />
        )}
        {occurredAt !== null && <Text color="dark-2">
          {eventType}
        </Text>}
      </Box>

      <Box justify="center" align="center">
        <Text color="dark-2">
          {occurredAt !== null ? formatElapsed(sinceStart) : "-"}
        </Text>
      </Box>
      <Box justify="center" align="center">
        <Text color="dark-2">
          {occurredAt !== null ? formatElapsed(elapsed) : "-"}
          {hasEnded && <Text color="green">
            <span dangerouslySetInnerHTML={{ __html: '&nbsp;&check;'}} />
          </Text>}
        </Text>
      </Box>
    </>
  )
}

export default EventTimer
