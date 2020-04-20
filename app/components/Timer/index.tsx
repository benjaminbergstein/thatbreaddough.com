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

const Timer: React.FC<any> = () => {
  const [timer, setTimer] = useState<BreadTimer>([])
  const startEvent = firstEvent(timer, START)
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
        startEvent={startEvent}
        targetEvent={doneEvent}
        captureEvent={captureEvent}
        disabled={'auto'}
      />
    </Grid>
  )
}

export default Timer
