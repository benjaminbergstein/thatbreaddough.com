import React, { useState, useEffect } from 'react'
import {
  Grid,
  Text,
  Heading,
  Box,
  Main,
  Button,
} from 'grommet'

import {
  EventType,
  RawEvent,
  NullEvent,
  BreadTimer,
} from '../../utils/timer/types'

import {
  formatElapsed,
  firstEvent,
  filterForType,
  addEvent,
} from '../../utils/timer'

const {
  START,
  LEVAIN,
  AUTOLYSE,
  MIX,
  FOLD,
} = EventType

const EventTimer: React.FC<any> = ({
  tick,
  startEvent,
  endEvent = { occurredAt: null },
  targetEvent,
  captureEvent
}) => {
  const { type: eventType, occurredAt } = targetEvent
  const { occurredAt: startedAt } = startEvent
  const { occurredAt: endedAt } = endEvent
  const sinceStart = occurredAt - startedAt
  const hasEnded = endedAt !== null
  const elapsed = (endedAt || tick)- occurredAt

  return (
    <>
      <Box height={{ min: "3rem" }} justify="center" align="center">
        {occurredAt === null && (
          <Button
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

const Timer: React.FC<any> = () => {
  const [timer, setTimer] = useState<BreadTimer>([])
  const startEvent = firstEvent(START, timer)
  const [tick, setTick] = useState<number>(+new Date())

  const captureEvent: (type: EventType) => void = (type) => {
    setTimer(addEvent(timer, type))
  }

  useEffect(() => {
    const { setInterval, clearInterval } = window as any
    const interval = setInterval(() => {
      setTick(+new Date())
    }, 100)

    return () => { clearInterval(interval) }
  }, [timer])

  const mixEvent = firstEvent(MIX, timer)
  const folds = mixEvent ? filterForType(FOLD, timer) : []
  const foldBasis = folds.slice(-1)[0] || mixEvent

  return (
    <Grid fill="horizontal" columns={['1/3', '1/3', '1/3']}>
      <Box justify="center" align="center">Event</Box>
      <Box justify="center" align="center">Occurred at</Box>
      <Box justify="center" align="center">Elapsed</Box>
      <EventTimer
        tick={tick}
        startEvent={startEvent}
        endEvent={firstEvent(MIX, timer)}
        targetEvent={firstEvent(LEVAIN, timer)}
        captureEvent={captureEvent}
      />
      <EventTimer
        tick={tick}
        startEvent={startEvent}
        endEvent={firstEvent(MIX, timer)}
        targetEvent={firstEvent(AUTOLYSE, timer)}
        captureEvent={captureEvent}
      />
      <EventTimer
        tick={tick}
        startEvent={startEvent}
        targetEvent={firstEvent(MIX, timer)}
        captureEvent={captureEvent}
      />
      {mixEvent.occurredAt !== null && (
        <>
          {folds.map((fold, index) => (
            <EventTimer
              tick={tick}
              startEvent={index === 0 ? mixEvent : folds[index - 1]}
              targetEvent={fold}
              captureEvent={captureEvent}
            />
          ))}
          <EventTimer
            tick={tick}
            startEvent={startEvent}
            targetEvent={{ type: FOLD, occurredAt: null}}
            captureEvent={captureEvent}
          />
        </>
      )}
    </Grid>
  )
}

export default Timer
