import React from 'react'
import styled, { createGlobalStyle, ThemeProvider, keyframes } from 'styled-components'

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
import { FaSpinner } from 'react-icons/fa'
import Box from './Box'
import Text from './Text'

const darks = [
  '#000',
  '#111',
  '#333',
  '#505050',
  '#666',
  '#777',
  '#999',
]
const lights = [
  '#aaa',
  '#bbb',
  '#ccc',
  '#ddd',
  '#eee',
  '#fff'
]
export const theme = {
  colors: {
    brand: '#937674',
    brand2: '#00739d',
    heading1: '#455278',
    accent1: '#ade1ca',
    lights,
    darks,
    grayscale: [
      ...darks,
      ...lights.reverse()
    ],
    'orange/dark': '#bd703d'
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32],
  fontWeights: [100, 300, 500, 700, 900],
  space: [3, 5, 8, 10, 12, 15, 20, 30, 40, 50, 80, 100, 150, 200]
}

const spinnerKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const SpinnerText = styled(Text)`
  display: inline-block;
  animation: ${spinnerKeyframes} 2s ease-in-out 0s infinite;
  transform-origin: 50% 42%;
`

export const Spinner: React.FC<{ Icon: React.Component } & any> = ({ Icon = FaSpinner }) => (
  <SpinnerText><Icon /></SpinnerText>
)

export const Anchor = styled(Text)`
  ${color}
  cursor: pointer;
`
Anchor.defaultProps = { as: 'a', color: 'brand' }
export const Heading = styled(Text)`
  padding: 0;
  margin: 0;
`

Heading.defaultProps = {
  fontWeight: 3,
  fontSize: 4,
  as: 'h1',
  color: 'heading1'
}

const BaseStyles = createGlobalStyle`
  body {
    font-family: "Helvetica Neue", sans-serif;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  button {
    font-family: "Helvetica Neue", sans-serif;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }
`

const System: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <BaseStyles/>
    {children}
  </ThemeProvider>
)

export { default as Box, Card, Main, Grid } from './Box'
export { default as Button } from './Button'
export { default as Text } from './Text'
export { default as Input } from './Input'
export default System
