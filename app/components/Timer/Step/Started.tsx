import React from 'react'
import {
  Grid,
  Text,
  Box,
  Spinner
} from '../../System'
import Button from '../../System/Button'
import { FaCheckCircle } from 'react-icons/fa'

import { EventType } from '../../../storage/v2/types'
import Clock from '../Clock'

interface Props {
  eventType: EventType;
  startedAt: number;
  occurredAt: number;
  endedAt: number;
  hasEnded: boolean;
  isDoneEvent: boolean;
}

const Started: React.FC<Props> = ({
  eventType,
  startedAt,
  endedAt,
  hasEnded,
  occurredAt,
  isDoneEvent,
  children: header
}) => (
  <React.Fragment key={`Started-${eventType}-${'' + occurredAt}`}>
    <Box flex="1">
      {header}
    </Box>
    <Box>
      {!isDoneEvent && <Clock start={occurredAt} end={endedAt} />}
      {isDoneEvent && '-'}
    </Box>
    <Box
      flexBasis="30px"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      position="relative"
      top="2px"
    >
      {!hasEnded && <Text fontSize={2} color="brand">
        <Spinner />
      </Text>}
      {hasEnded && <Text fontSize={1} color="green">
        <FaCheckCircle />
      </Text>}
    </Box>
  </React.Fragment>
)

Started.displayName = 'Started'

export default Started
