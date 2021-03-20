import styled, { ThemeProvider, keyframes } from 'styled-components'
import {
  background,
  position,
  border,
  shadow,
  space,
  layout,
  flexbox,
  color,
  typography
} from 'styled-system'

const Box = styled.div({}, space, layout, position, flexbox, background, border, shadow, color)

export const Main = Box
export const Grid = Box

export const Card = styled(Box)``
Card.defaultProps = {
  p: 4,
  borderRadius: '3px',
  boxShadow: '0px 1px 2px 0px #bbb'
}

export default Box
