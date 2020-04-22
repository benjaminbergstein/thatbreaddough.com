import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
import Head from 'next/head'
import { Main, Box, Text, Paragraph, Anchor, Layer, Button, Markdown } from 'grommet'
import { FaPlay, FaTimes } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import Timer from '../../components/Timer'
import Analytics from '../../components/Analytics'

import { terms as GLOSSARY_CONTENT } from '../../utils/glossary'

const GlossaryPage: React.FC<any> = () => {
  const [firstEvent, setFirstEvent] = useState<number | null>(null)
  return <Layout>
    <Analytics pageView="Glossary" />
    <Head>
      <title>Glossary | Bread Dough Terms | Sourdough Bread Timer</title>
    </Head>
    <Box style={{ margin: "0 auto" }} width={{ max: "800px" }} height={{ min: '100%' }} pad="large" align="center">
      <Text weight="bold" size="xxlarge" color="dark-3">Glossary</Text>
      <Markdown components={{ p: { component: Paragraph, props: { "fill": true } } }}>{GLOSSARY_CONTENT}</Markdown>
    </Box>
  </Layout>
}

export default GlossaryPage
