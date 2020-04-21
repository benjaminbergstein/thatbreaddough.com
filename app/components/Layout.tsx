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

const IndexPage: React.FC<any> = ({ children }) => <Grommet theme={theme}>
  <Box>
    <Nav direction="row" background="light-2" pad="medium">
      <Link href="/">
        <Anchor
          color="brand"
          icon={<TiHome />}
          label="Home"
        />
      </Link>
      <Link href="/timer">
        <Anchor
          icon={<TiStopwatch />}
          label="Timer"
        />
      </Link>
    </Nav>
    {children}
  </Box>
</Grommet>

export default IndexPage
