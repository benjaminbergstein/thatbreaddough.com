import React, { useState, useLayoutEffect as _useLayoutEffect, useEffect } from 'react'
import ReactGa from 'react-ga'
import styled from 'styled-components'

import {
  Grid,
  Text,
  Heading,
  Box,
  Main,
  Spinner,
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
import Link from 'next/link'

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

const isServer = typeof window === "undefined"
const FoldTypes = [COIL_FOLD, STRETCH_FOLD, SLAP_FOLD, FOLD, LAMINATE, REST, RUBAUD]

const last: (arr: any[]) => any = (arr) => arr.slice(-1)[0]

const useLayoutEffect = isServer ? useEffect : _useLayoutEffect

const Timer: React.FC<{}> = () => {
  const [feedbackEvent, setFeedBackEvent] = useState<RawEvent>(nullEvent)
  const [storage, saveTimer] = useStorage()
  const [timer, updateTimer] = useState<BreadTimer>([])
  const recipe = storage.recipe

  const flour = recipe?.flour
  const water = recipe?.water
  const starter = recipe?.starter
  const salt = recipe?.salt
  const totalDoughWeight = recipe?.totalDoughWeight
  const starterPart = starter && Math.ceil(starter / 3.0 + 3.33)

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
    <TickProvider key="client">
      <Box margin={5}>
        {!isServer && !recipe && <Box key="go-to-timer">
          <Link href="/sourdough-calculator?ref=timer_cta">
            <Button>
              Add recipe
            </Button>
          </Link>
        </Box>}

        <SectionHeading label="Pre-ferment" firstEvent={firstEvent(timer, LEVAIN)} />

        {recipe && <Box my={3} display="flex" flexDirection="column" borderWidth="1px" borderStyle="solid" borderColor="brand" py={1} px={2} borderRadius="8px">
          <Text color="darks.2" fontWeight={4} lineHeight="24px">Levain build</Text>
          <Text color="darks.3" lineHeight="24px">{starterPart}g flour</Text>
          <Text color="darks.3" lineHeight="24px">{starterPart}g water</Text>
          <Text color="darks.3" lineHeight="24px">{starterPart}g starter</Text>
        </Box>}

        <Step
          startEvent={startEvent}
          endEvent={firstEvent(timer, MIX)}
          targetEvent={firstEvent(timer, LEVAIN)}
          captureEvent={captureEvent}
        />


        {recipe && <Box my={3} display="flex" flexDirection="column" borderWidth="1px" borderStyle="solid" borderColor="brand" py={1} px={2} borderRadius="8px">
          <Text color="darks.2" fontWeight={4} lineHeight="24px">Preferment</Text>
          <Text color="darks.3" lineHeight="24px">{water}g water</Text>
          <Text color="darks.3" lineHeight="24px">({salt}g salt)</Text>
          <Text color="darks.3" lineHeight="24px">{flour}g flour</Text>
        </Box>}

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

        {recipe && <Box my={3} display="flex" flexDirection="column" borderWidth="1px" borderStyle="solid" borderColor="brand" py={1} px={2} borderRadius="8px">
          <Text color="darks.2" fontWeight={4} lineHeight="24px">Add levain</Text>
          <Text color="darks.3" lineHeight="24px">{starter}g levain</Text>
        </Box>}

        <Step
          startEvent={startEvent}
          endEvent={bakeEvent}
          targetEvent={firstEvent(timer, MIX)}
          captureEvent={captureEvent}
          disabled={!hasEvent(timer, LEVAIN)}
        />

        {recipe && <Box my={3} display="flex" flexDirection="column" borderWidth="1px" borderStyle="solid" borderColor="brand" py={1} px={2} borderRadius="8px">
          <Text color="darks.2" fontWeight={4} lineHeight="24px">Salt</Text>
          <Text color="darks.3" lineHeight="24px">{salt}g salt</Text>
          <Text color="darks.3" lineHeight="24px">(unless added during preferment)</Text>
        </Box>}

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
