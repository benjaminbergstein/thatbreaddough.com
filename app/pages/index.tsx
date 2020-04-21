import React from 'react'
import Head from 'next/head'

import styled from 'styled-components'
import Link from 'next/link'
import {
  Heading,
  Box,
  Main,
  Button,
  Text,
} from 'grommet'

import Layout from '../components/Layout'

const IndexPage: React.FC<any> = () => <Layout>
  <Head>
    <title>Sourdough Bread Timer</title>
  </Head>
  <Box fill="horizontal" align="center" flex="grow">
    <Box
      width={{ max: '500px', }}
      align="center"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        zIndex: 2, boxShadow: 'white 0px 50px 24px 14px'
      }}
      pad={{ horizontal: "large", vertical: "xlarge" }}
      margin={{ bottom: '100px' }}
    >
      <Text as="h1" size="xxlarge" weight="bold" color="dark-1" margin={{ vertical: 'small' }}>
        Sourdough bread timer
      </Text>

      <Heading level={3} color="dark-2">
        An interval timer for working out your sourdough muscles.
        Easily track the time between mix, folds, proof,  bake, and more.
      </Heading>

      <Box align="center" fill margin={{ vertical: 'medium' }}>
        <Text>
          <Link href="/timer">
            <Button
              primary
              a11yTitle="Start a timer"
              label="Start a timer"
            />
          </Link>
        </Text>
      </Box>
    </Box>

    <Screenshot>
      <ScreenshotWrapper>
        <img src="screenshot.jpg" width="100%" />
      </ScreenshotWrapper>
    </Screenshot>
  </Box>
</Layout>

const Hero = styled.div`
  background: rgba(255, 255, 255, 0.9);
  zIndex: 2;
  boxShadow: white -40px 0px 24px 14px;
`

const Screenshot = styled.div`
  width: 100%;
  position: fixed;
  top: 55%;
  height: 45%;
  overflow: hidden;
  z-index: 1;
`

const ScreenshotWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`

export default IndexPage
