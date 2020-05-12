import react from 'react'
import styled from 'styled-components'
import { Heading, Box, Text } from '../System'

import {
  RawEvent
} from '../../storage/v2/types'

const Wrapper = styled(Box)`
  text-transform: uppercase;
  letter-spacing: 1px;
`

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const dateStr = date.toDateString()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return <>{dateStr} // {`${hours}:${minutes}`}</>
}

const SectionHeading: React.FC<{
  label: string;
  firstEvent?: RawEvent;
}> = ({
  label,
  firstEvent = undefined
}) => (
  <Box
    marginTop={7}
    marginBottom={4}
  >
    <Wrapper
      display="flex"
      flexDirection="row"
      alignItems="center"
      py="5px"
    >
      <Box flex="1">
        <Heading fontSize={2}>{label}</Heading>
      </Box>
      {firstEvent && firstEvent.occurredAt && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text color="lights.5" fontSize={0} style={{ textTransform: 'uppercase' }}>
            {formatDate(firstEvent.occurredAt)}
          </Text>
        </Box>
      )}
    </Wrapper>
  </Box>
)

export default SectionHeading
