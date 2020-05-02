import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
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
} from '../../storage/v2/types'

import {
  formatElapsed,
  firstEvent,
  filterForType,
  addEvent,
  hasEvent,
} from '../../utils/timer'

import Step from './Step'
import MultiStep from './MultiStep'

import useStorage from '../../hooks/useStorage'

const {
  START,
  FEED,
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

interface Props {
  onEvent: (timer: BreadTimer) => void
}


const Timer: React.FC<Props> = ({ onEvent }) => {
  const [storage, setTimer, storageVersion, needsMigration] = useStorage()
  if (needsMigration) return null
  const { timer } = storage

  const startEvent = firstEvent(timer, START)

  const resetTimer = () => {
    const hasConfirmedReset = confirm('Are you sure? All data will be lost.')
    if (!hasConfirmedReset) return
    setTimer([])
  }

  const captureEvent: (type: EventType) => void = (type) => {
    try {
      ReactGa.event({
        category: 'Timer',
        action: 'Step captured',
        label: type,
      })
    } catch (e) {}
    const newTimer = addEvent(timer, type)
    setTimer(newTimer)
    onEvent(newTimer)
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
          <MultiStep
            timer={timer}
            eventType={FEED}
            disabled={false}
            startEvent={startEvent}
            captureEvent={captureEvent}
            hiddenByEvent={firstEvent(timer, LEVAIN)}
            defaultPreviousEvent={startEvent}
            defaultNextEvent={firstEvent(timer, LEVAIN)}
          />
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
          <MultiStep
            timer={timer}
            eventType={FOLD}
            disabled={!hasEvent(timer, MIX)}
            startEvent={startEvent}
            captureEvent={captureEvent}
            hiddenByEvent={bulkEvent}
            defaultPreviousEvent={mixEvent}
            defaultNextEvent={bulkEvent}
          />
          <Step
            startEvent={folds.slice(-1)[0] || { type: FOLD, occurredAt: null }}
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
            endEvent={{ occurredAt: null, type: PROOF }}
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
