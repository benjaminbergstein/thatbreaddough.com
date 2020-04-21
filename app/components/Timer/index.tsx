import React, { useState, useEffect } from 'react'
import createPersistedState from 'use-persisted-state'
import { MdRefresh } from 'react-icons/md'

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
  hasEvent,
} from '../../utils/timer'

import Header from './Header'
import Step from './Step'

const {
  START,
  LEVAIN,
  AUTOLYSE,
  MIX,
  FOLD,
  SALT,
  BULK,
  PRESHAPE,
  PROOF,
  STEAM,
  BAKE,
  END,
} = EventType

const useTimerState = createPersistedState('bread-timer')

const Timer: React.FC<any> = () => {
  const [timer, setTimer] = useTimerState<BreadTimer>([])
  const startEvent = firstEvent(timer, START)
  const [tick, setTick] = useState<number>(+new Date())

  const resetTimer = () => { setTimer([]) }

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

  const mixEvent = firstEvent(timer, MIX)
  const bulkEvent = firstEvent(timer, BULK)
  const folds = mixEvent ? filterForType(timer, FOLD) : []
  const foldBasis = folds.slice(-1)[0] || mixEvent

  const preshapeEvent = firstEvent(timer, PRESHAPE)
  const proofEvent = firstEvent(timer, PROOF)
  const steamEvent = firstEvent(timer, STEAM)
  const bakeEvent = firstEvent(timer, BAKE)
  const doneEvent = firstEvent(timer, END)

  return (
    <Grid fill="horizontal" align="center" justify="center">
      <Box fill align="center" justify="center" margin={{ bottom: "large" }}>
        <Text weight="bold" size="xxlarge" color="dark-3">Bread timer</Text>
        <Text weight="normal" size="medium" color="dark-2">
          Keep track of how long each step in your dough's development has lasted
          with this timer. Click 
        </Text>
      </Box>

      <Box fill>
        <Grid fill="horizontal" columns={['1/3', '1/3', '1/3']}>
          <Header />
          <Step
            tick={tick}
            startEvent={startEvent}
            endEvent={firstEvent(timer, MIX)}
            targetEvent={firstEvent(timer, LEVAIN)}
            captureEvent={captureEvent}
          />
          <Step
            tick={tick}
            startEvent={startEvent}
            endEvent={firstEvent(timer, MIX)}
            targetEvent={firstEvent(timer, AUTOLYSE)}
            captureEvent={captureEvent}
          />
          <Step
            tick={tick}
            startEvent={startEvent}
            endEvent={bakeEvent}
            targetEvent={firstEvent(timer, MIX)}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, LEVAIN)}
          />
          <Step
            tick={tick}
            startEvent={firstEvent(timer, MIX)}
            endEvent={firstEvent(timer, FOLD)}
            targetEvent={firstEvent(timer, SALT)}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, MIX)}
          />
          {folds.map((fold, index) => (
            <Step
              tick={tick}
              startEvent={index === 0 ? mixEvent : folds[index - 1]}
              endEvent={folds[index + 1] || bulkEvent}
              targetEvent={fold}
              captureEvent={captureEvent}
            />
          ))}
          {bulkEvent.occurredAt === null && <Step
            tick={tick}
            startEvent={startEvent}
            targetEvent={{ type: FOLD, occurredAt: null}}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, MIX)}
          />}
          <Step
            tick={tick}
            startEvent={folds.slice(-1)[0] || { occurredAt: null }}
            endEvent={preshapeEvent}
            targetEvent={bulkEvent}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, FOLD)}
          />
          <Step
            tick={tick}
            startEvent={bulkEvent}
            endEvent={proofEvent}
            targetEvent={preshapeEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
          <Step
            tick={tick}
            startEvent={preshapeEvent}
            endEvent={bakeEvent}
            targetEvent={proofEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
          <Step
            tick={tick}
            startEvent={proofEvent}
            endEvent={doneEvent}
            targetEvent={bakeEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
          <Step
            tick={tick}
            startEvent={hasEvent(timer, PROOF) ? startEvent : proofEvent}
            targetEvent={doneEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
        </Grid>
      </Box>

      <Box margin={{ top: "large" }}>
        <Button
          color="status-warning"
          type="reset"
          size="large"
          icon={<MdRefresh />}
          label="Reset timer"
          onClick={resetTimer}
        />
      </Box>
    </Grid>
  )
}

export default Timer
