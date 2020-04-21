import React from 'react'
import Link from 'next/link'
import { TiHome, TiStopwatch } from 'react-icons/ti'
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

const IndexPage: React.FC<any> = ({ children }) => <Grommet theme={theme} style={{ height: '100%' }}>
  <Box height={{ min: '100%' }}>
    <Nav direction="row" background="light-2" pad="medium">
      <Link href="/">
        <Anchor icon={<TiHome />} a11yTitle="Home" />
      </Link>
      <Link href="/timer">
        <Anchor icon={<TiStopwatch />} a11yTitle="Timer" />
    </Link>
    </Nav>
    {children}
    <Footer>&copy; 2020 <Anchor href="http://benjaminbergstein.com">Ben Bergstein</Anchor></Footer>
  </Box>
</Grommet>


const Footer = styled.footer`
  position: relative;
  z-index: 2;
`
export default IndexPage
