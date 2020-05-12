import React, { useState, useLayoutEffect, useEffect } from 'react'
import ReactGa from 'react-ga'
import styled from 'styled-components'

import {
  Grid,
  Text,
  Heading,
  Box,
  Main
} from '../System'

import Button from '../System/Button'
import Feedback from '../Feedback'

import {
  EventType,
  RawEvent,
  NullEvent,
  BreadTimer,
  nullEvent
} from '../../storage/v2/types'

import {
  formatElapsed,
  firstEvent,
  filterForType,
  addEvent,
  hasEvent,
  someEvent,
  isNullEvent
} from '../../utils/timer'

import Step from './Step'
import MultiStep from './MultiStep'
import SectionHeading from './SectionHeading'

import { TickProvider } from '../../hooks/useClock'
import useStorage from '../../hooks/useStorage'

const {
  NULL,
  START,
  FEED,
  LEVAIN,
  AUTOLYSE,
  MIX,
  COIL_FOLD,
  STRETCH_FOLD,
  SLAP_FOLD,
  LAMINATE,
  RUBAUD,
  FOLD,
  REST,
  SALT,
  BULK,
  RETARD,
  PRESHAPE,
  PROOF,
  STEAM,
  BAKE,
  END
} = EventType

const FoldTypes = [COIL_FOLD, STRETCH_FOLD, SLAP_FOLD, FOLD, LAMINATE, REST, RUBAUD]

const last: (arr: any[]) => any = (arr) => arr.slice(-1)[0]

const Timer: React.FC<{}> = () => {
  const [feedbackEvent, setFeedBackEvent] = useState<RawEvent>(nullEvent)
  const [storage, saveTimer, storageVersion, needsMigration] = useStorage()
  const [timer, updateTimer] = useState<BreadTimer>([])

  if (needsMigration) return null

  useLayoutEffect(() => { updateTimer(storage.timer) }, [storage.timer])

  const startEvent = firstEvent(timer, START)

  const resetTimer = () => {
    const hasConfirmedReset = confirm('Are you sure? All data will be lost.')
    if (!hasConfirmedReset) return
    setFeedBackEvent(nullEvent)
    saveTimer([])
  }

  const captureEvent: (type: EventType) => void = (type) => {
    try {
      ReactGa.event({
        category: 'Timer',
        action: 'Step captured',
        label: type
      })
    } catch (e) {}
    const newTimer = addEvent(timer, type)
    if (isNullEvent(feedbackEvent)) setFeedBackEvent(last(newTimer))
    saveTimer(newTimer)
  }

  const mixEvent = firstEvent(timer, MIX)
  const bulkEvent = firstEvent(timer, BULK)
  const folds = mixEvent ? filterForType(timer, FoldTypes) : []
  const foldBasis = last(folds) || mixEvent

  const preshapeEvent = firstEvent(timer, PRESHAPE)
  const proofEvent = firstEvent(timer, PROOF)
  const steamEvent = firstEvent(timer, STEAM)
  const bakeEvent = firstEvent(timer, BAKE)
  const doneEvent = firstEvent(timer, END)
  const firstFold = filterForType(timer, FoldTypes)[0] || { occurredAt: null, type: NULL }

  return (
    <TickProvider>
      <Box margin={5}>
        <SectionHeading label="Feeds" firstEvent={firstEvent(timer, FEED)} />
        <MultiStep
          timer={timer}
          eventTypes={[FEED]}
          disabled={false}
          startEvent={startEvent}
          captureEvent={captureEvent}
          hiddenByEvent={firstEvent(timer, LEVAIN)}
          defaultPreviousEvent={startEvent}
          defaultNextEvent={firstEvent(timer, LEVAIN)}
          forceButtons={true}
          showNothingRecordedMessage={true}
        />

        <SectionHeading label="Pre-ferment" firstEvent={firstEvent(timer, LEVAIN)} />

        <Step
          startEvent={startEvent}
          endEvent={firstEvent(timer, MIX)}
          targetEvent={firstEvent(timer, LEVAIN)}
          captureEvent={captureEvent}
        />

        <MultiStep
          timer={timer}
          eventTypes={[AUTOLYSE]}
          disabled={!hasEvent(timer, LEVAIN)}
          startEvent={startEvent}
          captureEvent={captureEvent}
          hiddenByEvent={firstEvent(timer, MIX)}
          defaultPreviousEvent={firstEvent(timer, LEVAIN)}
          defaultNextEvent={firstEvent(timer, MIX)}
          forceButtons={true}
          limit={1}
        />

        <SectionHeading label="Mixing" firstEvent={firstEvent(timer, MIX)} />

        <Step
          startEvent={startEvent}
          endEvent={bakeEvent}
          targetEvent={firstEvent(timer, MIX)}
          captureEvent={captureEvent}
          disabled={!hasEvent(timer, LEVAIN)}
        />

        <MultiStep
          timer={timer}
          eventTypes={[SALT]}
          disabled={!hasEvent(timer, MIX)}
          startEvent={startEvent}
          captureEvent={captureEvent}
          hiddenByEvent={firstFold}
          defaultPreviousEvent={firstEvent(timer, MIX)}
          defaultNextEvent={firstFold}
          forceButtons={true}
          limit={1}
        />

        <SectionHeading label="Strengthening" firstEvent={folds[0]} />

        <MultiStep
          timer={timer}
          eventTypes={FoldTypes}
          disabled={!hasEvent(timer, MIX)}
          startEvent={startEvent}
          captureEvent={captureEvent}
          hiddenByEvent={bulkEvent}
          defaultPreviousEvent={mixEvent}
          defaultNextEvent={bulkEvent}
        />

        <SectionHeading label="Bulk ferment" firstEvent={bulkEvent} />

        <Step
          startEvent={last(folds) || { type: FOLD, occurredAt: null }}
          endEvent={preshapeEvent}
          targetEvent={bulkEvent}
          captureEvent={captureEvent}
          disabled={!someEvent(timer, FoldTypes)}
        />

        <SectionHeading label="Shaping" firstEvent={preshapeEvent} />
        <Step
          startEvent={bulkEvent}
          endEvent={proofEvent}
          targetEvent={preshapeEvent}
          captureEvent={captureEvent}
          disabled={'auto'}
        />

        <SectionHeading label="Final proof" firstEvent={proofEvent} />
        <Step
          startEvent={preshapeEvent}
          endEvent={firstEvent(timer, RETARD)}
          targetEvent={proofEvent}
          captureEvent={captureEvent}
          disabled={'auto'}
        />

        <MultiStep
          timer={timer}
          eventTypes={[RETARD]}
          disabled={!hasEvent(timer, PROOF)}
          startEvent={proofEvent}
          captureEvent={captureEvent}
          hiddenByEvent={firstEvent(timer, BAKE)}
          defaultPreviousEvent={proofEvent}
          defaultNextEvent={bakeEvent}
          forceButtons={true}
          limit={1}
        />

        <SectionHeading label="Bake!" firstEvent={bakeEvent} />
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

        <Box display="flex" flexDirection="row" marginTop={8} marginBottom={8} justifyContent="center">
          <Button
            bg="orange/dark"
            icon="trash"
            type="reset"
            onClick={resetTimer}
          >
            Reset timer
          </Button>
        </Box>
      </Box>

      <Feedback countEvents={timer.length} start={feedbackEvent.occurredAt} />
    </TickProvider>
  )
}

export default Timer
