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
import { FaChevronRight } from 'react-icons/fa'

import Layout from '../components/Layout'
import Analytics from '../components/Analytics'

const IndexPage: React.FC<any> = () => <Layout>
  <Analytics pageView="Home" />
  <Head>
    <title>That Bread Dough | Sourdough Bread Timer</title>
  </Head>
  <Wrapper fill="vertical" flex="grow">
    <Container fill align="center" flex="grow">
      <Box
        width={{ max: '500px' }}
        align="center"
        style={{ zIndex: 2 }}
        pad={{ horizontal: "large", vertical: "large" }}
        margin={{ bottom: '100px' }}
      >
        <Text as="h2" size="large" weight="bold" color="dark-5" margin={{ vertical: '0px' }}>
          That Bread Dough
        </Text>

        <Text as="h1" size="xxlarge" weight="bold" color="dark-1" margin={{ vertical: 'small' }}>
          Sourdough Timer
        </Text>

        <Heading level={4} color="dark-2" textAlign="center">
          An interval timer for working out your sourdough muscles.
          Easily track the time between mix, folds, proof,  bake, and more.
        </Heading>

        <Box align="center" fill margin={{ vertical: 'medium' }}>
          <Text>
            <Link href="/timer?ref=home_cta">
              <Button
                primary
                a11yTitle="Try the Timer"
                label={<Text>
                    Try the Timer
                    <IconPositioning>
                      <FaChevronRight />
                    </IconPositioning>
                  </Text>}
              />
            </Link>
          </Text>
        </Box>
      </Box>
    </Container>
  </Wrapper>
</Layout>

const Wrapper = styled(Box)`
  max-width: 1000px;
  margin: 0 auto;
`

const Container = styled(Box)`
  background: url(screenshot.jpg);
  background-size: contain;
  background-size: 390px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-y: 430px;
  background-position-x: 50%;
`

const Hero = styled.div`
  background: rgba(255, 255, 255, 0.9);
  zIndex: 2;
  boxShadow: white -40px 0px 24px 14px;
`

const IconPositioning = styled.span`
  position: relative;
  top: 2px;
  left: 11px;
  font-size: 15px;
`
export default IndexPage
