import React from 'react'
import Link from 'next/link'
import { TiHome, TiStopwatch } from 'react-icons/ti'

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
    <Link href="/">
      <Anchor
        icon={<TiHome />}
        label="Home"
      />
    </Link>
    <Link href="/timer">
      <Anchor
        icon={<TiStopwatch />}
        label="New timer"
      />
    </Link>
  </Nav>
  {children}
</Grommet>

export default IndexPage
