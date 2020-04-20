import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'

import styled from 'styled-components'
import Link from 'next/link'
import {
  Grid,
  Text,
  Heading,
  Box,
  Main,
  Button,
} from 'grommet'

type EventType = "start" | "levain" | "autolyse" | "salt" | "mix" | "fold"

interface RawEvent {
  type: EventType
  occurredAt: number
}

interface NullEvent {
  type: EventType
  occurredAt: null
}
type BreadTimer = RawEvent[]

const formatElapsed: (number) => string = (elapsed) => {
  const pad: (number) => string = (num) => num.toString().padStart(2, '0')
  const milli = elapsed % 1000
  const seconds = Math.floor(elapsed / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes/ 60)
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milli}`
}

const firstEvent: (desiredType: EventType, timer: BreadTimer) => RawEvent | NullEvent =
  (desiredType, timer) => (timer.find(({ type }) => desiredType === type) || { type: desiredType, occurredAt: null })

const EventTime: React.FC<any> = ({ tick, startEvent, targetEvent, captureEvent }) => {
  const { type: eventType, occurredAt } = targetEvent
  const { occurredAt: startedAt } = startEvent
  const sinceStart = occurredAt - startedAt
  const elapsed = tick - occurredAt

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
        </Text>
      </Box>
    </>
  )
}

const Timer: React.FC<any> = ({ breadTimer, captureEvent }) => {
  const startEvent = firstEvent("start", breadTimer)
  const [tick, setTick] = useState<number>(+new Date())

  useEffect(() => {
    const { setInterval, clearInterval } = window as any
    const interval = setInterval(() => {
      setTick(+new Date())
    }, 100)

    return () => { clearInterval(interval) }
  }, [breadTimer])

  return (
    <Grid fill="horizontal" columns={['1/3', '1/3', '1/3']}>
      <Box justify="center" align="center">Event</Box>
      <Box justify="center" align="center">Occurred at</Box>
      <Box justify="center" align="center">Elapsed</Box>
      <EventTime
        tick={tick}
        startEvent={startEvent}
        targetEvent={firstEvent("levain", breadTimer)}
        captureEvent={captureEvent}
      />
      <EventTime
        tick={tick}
        startEvent={startEvent}
        targetEvent={firstEvent("autolyse", breadTimer)}
        captureEvent={captureEvent}
      />
    </Grid>
  )
}

const TimerPage: React.FC<any> = () => {
  const [timer, setTimer] = useState<BreadTimer>([])
  const captureEvent: (eventType: EventType) => void =
    (eventType) => {
      const startEvent = firstEvent('start', timer)
      console.log(timer)
      const occurredAt = +new Date()
      const baseTimer = startEvent.occurredAt === null ?
        [{ ...startEvent, occurredAt }] : timer

      setTimer([
        ...baseTimer,
        { type: eventType, occurredAt }
      ])
    }

  return <Layout>
    <Main pad="large" align="center">
      <Timer breadTimer={timer} captureEvent={captureEvent} />
    </Main>
  </Layout>
}

export default TimerPage
