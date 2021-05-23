import styled from 'styled-components'
import Box from './Box'
import {
  color,
  typography
} from 'styled-system'

const Text = styled(Box)({}, color, typography)
Text.defaultProps = {
  as: 'span'
}

export default Text
