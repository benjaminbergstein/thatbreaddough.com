import React from 'react'
import {
  Grid,
  Text,
  Box,
  Button,
} from 'grommet'
import { FaPlay } from 'react-icons/fa'

import {
  EventType,
} from '../../../storage/v2/types'

interface Props {
  disabled: boolean,
  wasSkipped: boolean,
  eventType: EventType,
  captureEvent: (type: EventType) => void,
}

const Unstarted: React.FC<Props> = ({
  disabled,
  wasSkipped,
  eventType,
  captureEvent,
  children: header,
}) => (
  <Box
    background="white"
    elevation="xsmall"
    border={{ color: 'light-1' }}
    round='xsmall'
    pad={{ vertical: "small", horizontal: "medium" }}
    margin={{ bottom: "medium" }}
  >
    <Grid columns={["flex", "flex"]}>
      <Box justify="center">
        {header}
      </Box>

      <Box align="end" justify="end">
        <Text>
          {<Button
            disabled={disabled || wasSkipped}
            color="accent-1"
            icon={<FaPlay />}
            onClick={() => captureEvent(eventType)}
            style={{ paddingRight: '0' }}
          />}
        </Text>
      </Box>
    </Grid>
  </Box>
)

export default Unstarted
