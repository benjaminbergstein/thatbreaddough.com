import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
import Head from 'next/head'
import { Card, Heading, Main, Box, Text, Anchor } from '../components/System'
import Button from '../components/System/Button'
import { FaPlay } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'

import { baseUrl } from '../utils/siteMetadata'
import Analytics from '../components/Analytics'
import Layout from '../components/Layout2'
import Modal from '../components/Modal'
import Timer from '../components/Timer'

const Feedback: React.FC<any> = ({ start }) => {
  const [show, setShow] = useState<boolean>(false)
  const [wasShown, setWasShown] = useState<boolean>(false)

  useEffect(() => {
    if (start === null || wasShown === true) return

    const interval = setInterval(() => {
      const elapsed = +new Date() - start

      if (elapsed > 30000) {
        setShow(true)
        setWasShown(true)
        ReactGa.event({
          category: 'Feedback',
          action: 'Shown',
        })
      }
    })

    return () => { clearInterval(interval) }
  })

  const hideModal = (dismissed = true) => {
    setShow(false)
    ReactGa.event({
      category: 'Feedback',
      action: dismissed ? 'Dismissed' : 'Clicked',
    })
  }

  const feedbackClicked = () => { hideModal(false) }

  return <Modal onHide={hideModal} show={show}>
    <Card
      bg="white"
      position="relative"
      m={4}
      maxWidth="500px"
      marginTop={10}
      flexBasis="30%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box marginTop={8}><Heading>Hey there!</Heading></Box>
      <p>Enjoying the timer or having issues?</p>
      <Box marginBottom={8}>
        <Button target="_blank" onClick={feedbackClicked} href="https://forms.gle/3G1KLi79BMtCXyuY6">Give Feedback!</Button>
        <Button
          marginTop={2}
          fontWeight={1}
          fontSize={0}
          color='darks.4'
          plain
          onClick={hideModal}
          style={{ textDecoration: 'underline' }}
        >I'll give feedback later.</Button>
      </Box>
    </Card>
  </Modal>
}

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

        <Feedback start={firstEvent} />
        <Box>
          <Timer onEvent={(timer) => setFirstEvent(timer.slice(-1)[0].occurredAt)} />
        </Box>
      </Box>
    </Box>
  </Layout>
}

export default TimerPage
