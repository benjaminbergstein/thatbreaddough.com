import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'

import { Card, Heading, Box } from './System'
import Button from './System/Button'
import Modal from './Modal'

interface Props {
  countEvents: number;
  start: number;
}

const Interval = 60000

const Feedback: React.FC<Props> = ({ countEvents, start }) => {
  const [show, setShow] = useState<boolean>(false)
  const [wasShown, setWasShown] = useState<boolean>(false)

  useEffect(() => {
    if (start === null || wasShown === true) return

    const interval = setInterval(() => {
      const elapsed = +new Date() - start

      if (elapsed > (Interval * (countEvents - 1))) {
        setShow(true)
        setWasShown(true)
        ReactGa.event({
          category: 'Feedback',
          action: 'Shown'
        })
      }
    }, 1000)

    const cleanup: () => void = () => { clearInterval(interval) }
    return cleanup
  }, [countEvents])

  const hideModal: (dismissed?: boolean) => void = (dismissed = true) => {
    setShow(false)
    ReactGa.event({
      category: 'Feedback',
      action: dismissed ? 'Dismissed' : 'Clicked'
    })
  }

  const feedbackClicked = () => { hideModal(false) }

  return <Modal onHide={() => hideModal()} show={show}>
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
      <Box pt={8}><Heading>Hey there!</Heading></Box>
      <Box py={5}><p>Enjoying the timer or having issues?</p></Box>
      <Box pb={8}>
        <Button mt={4} target="_blank" onClick={feedbackClicked} href="https://forms.gle/3G1KLi79BMtCXyuY6">Give Feedback!</Button>
        <Button
          mt={4}
          fontWeight={1}
          fontSize={1}
          color="darks.4"
          plain
          onClick={hideModal}
          style={{ textDecoration: 'underline' }}
        >I&apos;ll give feedback later.</Button>
      </Box>
    </Card>
  </Modal>
}

export default Feedback
