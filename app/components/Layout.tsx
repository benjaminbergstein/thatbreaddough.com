import React from 'react'
import styled from 'styled-components'
import {
  Anchor,
  Nav,
  Heading,
  Box,
  Grommet,
} from 'grommet'

const theme = {
  global: {
    font: {
      family: 'Helvetica Neue',
      size: '14px',
      height: '20px',
    },
  },
};

const IndexPage: React.FC<any> = ({ children }) => <Grommet theme={theme} full>
  <Nav direction="row" background="brand" pad="medium">
    <Anchor href="/">Home</Anchor>
    <Anchor href="/timer">New timer</Anchor>
  </Nav>
  {children}
</Grommet>

export default IndexPage
