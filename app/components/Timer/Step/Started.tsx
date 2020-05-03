import React from 'react'
import {
  Grid,
  Text,
  Box,
  Button,
} from 'grommet'
import { FaCheckCircle } from 'react-icons/fa'

import { EventType } from '../../../storage/v2/types'
import Clock from '../Clock'

interface Props {
  startedAt: number
  occurredAt: number
  endedAt: number
  hasEnded: boolean
  isDoneEvent: boolean
}

const Started: React.FC<Props> = ({
  startedAt,
  endedAt,
  hasEnded,
  occurredAt,
  isDoneEvent,
  children: header,
}) => (
  <Box
    background="white"
    elevation="xsmall"
    border={{ color: 'light-1' }}
    round='xsmall'
    pad="medium"
    margin={{ bottom: "medium" }}
  >
    <Box>
      {header}
    </Box>
    <Grid
      margin={{ top: 'small' }}
      columns={['1/2', '1/2']}
      rows={["auto"]}
    >
      <Box><Text color="dark-3" size="small">start</Text></Box>
      <Box><Text color="dark-3" size="small">elapsed</Text></Box>

      <Box>
        <Text color="dark-2">
          <Clock start={startedAt} end={occurredAt} />
        </Text>
      </Box>

      <Box>
        <Text color="dark-2">
          {!isDoneEvent && <Clock start={occurredAt} end={endedAt} />}
          {isDoneEvent && '-'}
          {hasEnded && <Text size="small" color="green">
            <span>&nbsp;&nbsp;</span><FaCheckCircle />
          </Text>}
        </Text>
      </Box>
    </Grid>
  </Box>
)

export default Started
