import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Main, Box, Text } from 'grommet'
import { FaPlay } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'

import Layout from '../components/Layout'
import Timer from '../components/Timer'
import Analytics from '../components/Analytics'

const TimerPage: React.FC<any> = () => <Layout>
  <Analytics pageView="Timer" />
  <Head>
    <title>Timer | Sourdough Bread Timer</title>
  </Head>
  <Box fill height={{ min: '100%' }} pad="large" align="center">
    <Box
      width={{ max: '600px' }}
      flex={{ shrink: 0 }}
      align="center"
      justify="center"
      margin={{ bottom: "large" }}
    >
      <Text weight="bold" size="xxlarge" color="dark-3">Timer</Text>

      <Box margin={{ vertical: "medium" }}>
        <Text weight="normal" size="medium" color="dark-2">
          <p>This sourdough bread timer uses a generic structure
          for dough preparation to track the progress of your dough.</p>

          <p>Click the Play button (<FaPlay style={{ fontSize: '10px' }}/>) after
          you complete each step toward your loaf.</p>

          <p>Skip the "Autolyse" and "Salt" steps if you mix levain, flour and salt at once.</p>

          <p>Happy bread making! <Text color="neutral-4"><GiSlicedBread style={{ fontSize: '20px' }} /></Text></p>
        </Text>
      </Box>
    </Box>

    <Timer />
  </Box>
</Layout>

export default TimerPage
