import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
import Head from 'next/head'
import { Main, Box, Text, Anchor, Button } from 'grommet'
import { FaPlay } from 'react-icons/fa'
import { GiSlicedBread } from 'react-icons/gi'

import { baseUrl } from '../utils/siteMetadata'
import Analytics from '../components/Analytics'
import Layout from '../components/Layout'
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
    <Text style={{ textAlign: "center"}}>
      <Text size="large" weight="bold">Hey there!</Text>
      <p>Enjoying the timer or having issues?</p>
      <Button color="brand" primary target="_blank" onClick={feedbackClicked} href="https://forms.gle/3G1KLi79BMtCXyuY6" label="Give Feedback!" />
    </Text>
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


            <p>Happy bread making! <Text color="brand"><GiSlicedBread style={{ fontSize: '20px' }} /></Text></p>
          </Text>
        </Box>
      </Box>

      <Feedback start={firstEvent} />
      <Box fill width={{ max: '1300px' }}>
        <Timer onEvent={(timer) => setFirstEvent(timer.slice(-1)[0].occurredAt)} />
      </Box>
    </Box>
  </Layout>
}

export default TimerPage
