import React, { useState } from 'react'
import Head from 'next/head'
import { Heading, Main, Box, Text, Anchor } from '../components/System'
import Button from '../components/System/Button'
import { FaPlay } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'

import { baseUrl } from '../utils/siteMetadata'
import Analytics from '../components/Analytics'
import Layout from '../components/Layout2'
import Timer from '../components/Timer'

const TimerPage: React.FC<any> = () => {
  const [firstEvent, setFirstEvent] = useState<number | null>(null)
  return <Layout>
    <Analytics pageView="Timer" />
    <Head>
      <title>Timer | Sourdough Bread Timer</title>
      <link rel="canonical" href={`${baseUrl}/sourdough-timer`} />
    </Head>

    <Box display="flex" flexDirection="row" justifyContent="center">
      <Box flexBasis="500px" flexGrow="0">
        <Box margin={4}>
          <Heading>Sourdough Timer</Heading>
        </Box>

        <Box>
          <Timer />
        </Box>
      </Box>
    </Box>
  </Layout>
}

export default TimerPage
