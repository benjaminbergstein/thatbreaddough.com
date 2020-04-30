import React, { useRef } from 'react'
import Head from 'next/head'

import styled from 'styled-components'
import Link from 'next/link'
import {
  Heading,
  Box,
  Main,
  Button,
  Text,
  Grid,
} from 'grommet'
import { FaChevronRight } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'
import { IoIosArrowRoundDown } from 'react-icons/io'

import Layout from '../components/Layout'
import InfoSection from '../components/InfoSection'
import Analytics from '../components/Analytics'
import Sections from '../utils/infoSections'

const Cta: React.FC<{ text?: string }> = ({ text = 'Try the Timer' }) => (
  <Box align="center" fill margin={{ vertical: 'medium' }}>
    <Text>
      <Link href="/timer?ref=home_cta">
        <Button
          primary
          a11yTitle={text}
          label={<Text>
            {text}
            <IconPositioning>
              <FaChevronRight />
            </IconPositioning>
          </Text>}
        />
      </Link>
    </Text>
  </Box>
)

const IndexPage: React.FC<any> = () => {
  const infoSectionRef = useRef(null)
  const scrollToInfoSections = () => {
    if (infoSectionRef.current) {
      infoSectionRef.current.scrollIntoView()
    }
  }
  return (
    <Layout nav={false}>
      <Analytics pageView="Home" />
      <Head>
        <title>That Bread Dough | Sourdough Bread Timer</title>
      </Head>
      <Box align="center">
        <Wrapper fill="vertical" flex="grow">
          <Container fill align="center" flex="grow">
            <Box
              width={{ max: '500px' }}
              align="center"
              style={{ zIndex: 2 }}
              pad={{ horizontal: "large", top: "xlarge", bottom: 'small' }}
            >
              <Text as="h2" size="large" weight="bold" color="dark-5" margin={{ vertical: '0px' }}>
                That Bread Dough
              </Text>

              <Text as="h1" size="30px" weight="bold" color="dark-1" margin={{ top: 'medium', bottom: 'small' }}>
                Sourdough Timer
              </Text>

              <Heading level={4} color="dark-2" textAlign="center">
                An interval timer for working out your sourdough muscles.
                Easily track the time between mix, folds, proof,  bake, and more.
              </Heading>

              <Cta />
            </Box>
          </Container>
        </Wrapper>

        <InfoHeadline
          onClick={scrollToInfoSections}
          fill
          align="center"
          justify="center"
          margin={{ top: 'xlarge' }}
          pad={{
            top: 'xlarge',
            bottom: 'medium'
          }}
        >
          <Box width={{ max: '50%' }}>
            <Text
              margin={{ top: 'small' }}
              color='neutral-3'
              as="h2"
              size="xlarge"
            >
              How does the timer help?
            </Text>
            <Text
              margin={{ top: 'small' }}
              color='dark-3'
              as="h2"
              size="xlarge"
            >
              <IoIosArrowRoundDown />
            </Text>
          </Box>
        </InfoHeadline>

        <a ref={infoSectionRef} />
        {Sections.map((props, i) => (
          <>
            {i !== 0 && i !== 2 && <Text color='accent-1' style={{ opacity: '0.5' }}>
              <GiSlicedBread />
            </Text>}
            {i === 2 && <Cta text="Record a Bake"/>}
            <InfoSection {...props} />
          </>
        ))}
        <Box pad={{ top: '10px', bottom: '80px' }}>
          <Cta />
        </Box>
      </Box>
    </Layout>
  )
}

const InfoHeadline = styled(Box)`
  text-align: center;
  box-shadow: inset 0px 14px 30px -21px #ddd;
`

const Wrapper = styled(Box)`
  max-width: 1000px;
  margin: 0 auto;
`

const Container = styled(Box)`
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
