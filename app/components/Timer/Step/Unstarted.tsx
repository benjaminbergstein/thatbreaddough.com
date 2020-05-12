import React from 'react'
import {
  Text,
  Box
} from '../../System'
import Button from '../../System/Button'
import { FaPlay } from 'react-icons/fa'

import {
  EventType
} from '../../../storage/v2/types'

interface Props {
  disabled: boolean;
  wasSkipped: boolean;
  eventType: EventType;
  captureEvent: (type: EventType) => void;
}

const Unstarted: React.FC<Props> = ({
  disabled,
  wasSkipped,
  eventType,
  captureEvent,
  children: header
}) => (
  <>
    <Box flex="1">
      {header}
    </Box>

    <Box>
      <Text>
        {<Button
          plain
          color="accent1"
          disabled={disabled || wasSkipped}
          icon='play'
          onClick={() => captureEvent(eventType)}
        />}
      </Text>
    </Box>
  </>
)

export default Unstarted
