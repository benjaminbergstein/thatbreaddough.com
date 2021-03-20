import React, { useState } from 'react'
import Head from 'next/head'
import { Heading, Main, Box, Text, Anchor } from '../components/System'
import Button from '../components/System/Button'
import { FaPlay } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'

import { baseUrl } from '../utils/siteMetadata'
import Analytics from '../components/Analytics'
import Layout from '../components/Layout2'
import Calculator from '../components/Calculator'

const CalculatorPage: React.FC<any> = () => {
  return <Layout>
    <Analytics pageView="Calculator" />
    <Head>
      <title>Calculator | Sourdough Bread Timer & Calculator</title>
      <link rel="canonical" href={`${baseUrl}/calculator`} />
    </Head>

    <Box display="flex" flexDirection="row" justifyContent="center">
      <Box flexBasis="500px" flexGrow="0">
        <Box margin={4}>
          <Heading>Sourdough Calculator</Heading>
        </Box>

        <Box>
          <Calculator />
        </Box>
      </Box>
    </Box>
  </Layout>
}

export default CalculatorPage
