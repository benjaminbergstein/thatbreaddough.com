import React, { useRef } from 'react'
import Head from 'next/head'

import styled from 'styled-components'
import Link from 'next/link'
import { Button, Heading, Main, Box, Text, Anchor } from '../components/System'
import { FaChevronRight } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'
import { IoIosArrowRoundDown } from 'react-icons/io'

import Layout from '../components/Layout2'
import InfoSection from '../components/InfoSection'
import Analytics from '../components/Analytics'
import Sections from '../utils/infoSections'

const Cta: React.FC<{ text?: string }> = ({ text = 'Try the Timer' }) => (
  <Box display="flex" justifyContent="center" alignItems="center" my="24px">
    <Text>
      <Link href="/sourdough-timer?ref=home_cta">
        <Button a11yTitle={text} borderRadius="18px" height="37px" px="24px">
          <Text fontSize="18px" fontWeight={4}>
            {text}
            <IconPositioning>
              <FaChevronRight />
            </IconPositioning>
          </Text>
        </Button>
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
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Box maxWidth="1000px" margin="0 auto">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              maxWidth="400px"
              alignItems="center"
              justifyContent="center"
              zIndex={2}
              pt="96px"
              px="48px"
              pb="12px"
            >
              <Text fontSize="22px" fontWeight={3} color="darks.6" my="0px">
                That Bread Dough
              </Text>

              <Text fontSize="30px" fontWeight="600" color="darks.2" mt="24px" mb="12px">
                Sourdough Timer
              </Text>

              <Text lineHeight="24px" fontSize="18px" color="darks.4" textAlign="center" fontWeight="600" my="24px">
                An interval timer for working out your sourdough muscles.
                Easily track the time between mix, folds, proof,  bake, and more.
              </Text>

              <Cta />
            </Box>
          </Box>
        </Box>

        <InfoHeadline
          width="100%"
          onClick={scrollToInfoSections}
          mt="50px"
          pt="50px"
          pb="30px"
        >
          <Box display="flex" alignItems="center" justifyContent="center" maxWidth="50%" mx="auto" flexDirection="column">
            <Text
              color="brand2"
              as="h2"
              fontSize="26px"
              fontWeight={3}
              my="21px"
            >
              How does the timer help?
            </Text>
            <Text
              color="brand"
              as="h2"
              fontSize="26px"
              fontWeight={3}
              my="21px"
            >
              <IoIosArrowRoundDown />
            </Text>
          </Box>
        </InfoHeadline>

        <a ref={infoSectionRef} />
        {Sections.map((props, i) => (
          <>
            {i !== 0 && i !== 2 && <Text color="brand" fontSize={5} mt="12px" mb="24px" style={{ opacity: '0.95' }}>
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

const IconPositioning = styled.span`
  position: relative;
  top: 2px;
  left: 11px;
  font-size: 15px;
`
export default IndexPage
