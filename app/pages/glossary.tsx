import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
import Head from 'next/head'
import { Main, Grid, Box, Text, Paragraph, Anchor, Layer, Button, Markdown } from 'grommet'
import { FaPlay, FaTimes } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Timer from '../components/Timer'
import Analytics from '../components/Analytics'
import { terms } from '../utils/glossary'

const GlossaryPage: React.FC<any> = () => {
  const [firstEvent, setFirstEvent] = useState<number | null>(null)
  return <Layout>
    <Analytics pageView="Glossary" />
    <Head>
      <title>Glossary | Bread Dough Terms | Sourdough Bread Timer</title>
    </Head>
    <Box style={{ margin: '0 auto' }} width={{ min: '0px', max: '800px' }} height={{ min: '100%' }} pad="large" align="center">
      <Box margin="medium" style={{ textAlign: 'center' }}>
        <Text as="h1" weight="bold" size="xxlarge" color="dark-3" margin="0">Glossary</Text>
        <Text as="h3" weight="bold" size="medium" color="dark-5" margin="small">Bread terms for better results</Text>
      </Box>
      <Grid pad={{ vertical: 'medium', horizontal: 'small' }} gap="small" columns={['1/2', '1/2']}>
        <img src="dough.jpg" width="100%" />
        <img src="loaf.jpg" width="100%" />
      </Grid>
      <Markdown components={{ p: { component: Paragraph, props: { fill: true } } }}>{terms}</Markdown>
    </Box>
  </Layout>
}

export default GlossaryPage
