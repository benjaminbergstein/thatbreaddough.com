import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'

import { Card, Heading, Box } from './System'
import Button from './System/Button'
import Modal from './Modal'

interface Props {
  countEvents: number
  start: number
}

const Feedback: React.FC<any> = ({ countEvents, start }) => {
  const [show, setShow] = useState<boolean>(false)
  const [wasShown, setWasShown] = useState<boolean>(false)

  useEffect(() => {
    if (start === null || wasShown === true) return

    const interval = setInterval(() => {
      const elapsed = +new Date() - start

      if (elapsed > (30000 * Math.pow(countEvents - 1, 3))) {
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
      mx="auto"
      p="inherit"
      paddingLeft={9}
      paddingRight={9}
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

export default Feedback
