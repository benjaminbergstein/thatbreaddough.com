import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
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

  const resetTimer = () => { setTimer([]) }

  const captureEvent: (type: EventType) => void = (type) => {
    try {
      ReactGa.event({
        category: 'Timer',
        action: 'Step captured',
        label: type,
      })
    } catch (e) {}
    setTimer(addEvent(timer, type))
  }

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
      <Box fill>
        <Grid fill="horizontal">
          <Step
            startEvent={startEvent}
            endEvent={firstEvent(timer, MIX)}
            targetEvent={firstEvent(timer, LEVAIN)}
            captureEvent={captureEvent}
          />
          <Step
            startEvent={startEvent}
            endEvent={firstEvent(timer, MIX)}
            targetEvent={firstEvent(timer, AUTOLYSE)}
            captureEvent={captureEvent}
          />
          <Step
            startEvent={startEvent}
            endEvent={bakeEvent}
            targetEvent={firstEvent(timer, MIX)}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, LEVAIN)}
          />
          <Step
            startEvent={firstEvent(timer, MIX)}
            endEvent={firstEvent(timer, FOLD)}
            targetEvent={firstEvent(timer, SALT)}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, MIX)}
          />
          {folds.map((fold, index) => (
            <Step
              startEvent={index === 0 ? mixEvent : folds[index - 1]}
              endEvent={folds[index + 1] || bulkEvent}
              targetEvent={fold}
              captureEvent={captureEvent}
              i={index + 1}
            />
          ))}
          {bulkEvent.occurredAt === null && <Step
            startEvent={startEvent}
            targetEvent={{ type: FOLD, occurredAt: null}}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, MIX)}
          />}
          <Step
            startEvent={folds.slice(-1)[0] || { occurredAt: null }}
            endEvent={preshapeEvent}
            targetEvent={bulkEvent}
            captureEvent={captureEvent}
            disabled={!hasEvent(timer, FOLD)}
          />
          <Step
            startEvent={bulkEvent}
            endEvent={proofEvent}
            targetEvent={preshapeEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
          <Step
            startEvent={preshapeEvent}
            endEvent={bakeEvent}
            targetEvent={proofEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
          <Step
            startEvent={proofEvent}
            endEvent={doneEvent}
            targetEvent={bakeEvent}
            captureEvent={captureEvent}
            disabled={'auto'}
          />
          <Step
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
