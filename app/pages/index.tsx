import React from 'react'
import Layout from '../components/Layout'

import styled from 'styled-components'
import Link from 'next/link'
import {
  Heading,
  Box,
  Main,
  Button,
} from 'grommet'

const IndexPage: React.FC<any> = () => <Layout>
  <Main pad="large" align="center">
    <Heading color="dark-1">
      Bread Timer
    </Heading>

    <Heading level={3} color="dark-2">
      A simple timer for tracking time since mix, folds, proof, and bake.
    </Heading>

    <Link href="/timer">
      <Button label="Start timer" />
    </Link>
  </Main>
</Layout>

export default IndexPage
