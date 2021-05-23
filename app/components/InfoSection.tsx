import React from 'react'
import styled from 'styled-components'
import { Box, Text } from '../components/System'

import useDevice from '../hooks/useDevice'

interface ScreenshotProps {
  backgroundPosition: number;
  first: boolean;
}

const DesktopScreenshot = styled(Box)`
  width: 100%;
  height: 190px;
  margin-bottom: 0px;
  background: url(screenshot.png);
  background-size: contain;
  background-size: 340px;
  background-repeat: no-repeat;
  box-shadow: inset 0px -100px 50px -50px white${(props: ScreenshotProps) => props.first ? '' : ', inset 0px 110px 20px -95px white'};
  background-position-y: ${(props: ScreenshotProps) => props.backgroundPosition}px;
  background-position-x: 50%;
`

const MobileScreenshot = styled(Box)`
  width: 100%;
  height: 140px;
  margin-top: 0;
  background: url(screenshot.png);
  background-size: contain;
  background-size: 340px;
  background-repeat: no-repeat;
  box-shadow: 0px 9px 11px -10px #c9c9c9${(props: ScreenshotProps) => props.first ? '' : ', inset 0px 110px 20px -95px white'};
  background-position-y: ${(props: ScreenshotProps) => props.backgroundPosition}px;
  background-position-y: ${(props: ScreenshotProps) => props.backgroundPosition}px;
  background-position-x: 50%;
`

interface Props {
  headline: string;
  body: string;
  backgroundPosition: number;
  first?: boolean;
}

const gridConfig = {
  mobile: {
    columns: ['100%'],
    rows: ['150px', 'flex']
  },
  desktop: {
    rows: ['100%'],
    columns: ['1/2', '1/2']
  },
  tablet: {
    rows: ['100%'],
    columns: ['1/2', '1/2']
  }
}

const InfoSection: React.FC<Props> = ({
  headline,
  body,
  backgroundPosition,
  first = false
}) => {
  const device = useDevice()
  const { rows, columns } = gridConfig[device]

  const Screenshot = device === 'mobile' ? MobileScreenshot : DesktopScreenshot
  return (
    <Box
      maxWidth="940px"
      mt={first ? "24px" : "48px"}
      mb="24px"
    >
      <Box display="flex" flexDirection={["column", "column", "row"]}>
        <Box flex="1">
          <Screenshot
            first={first}
            backgroundPosition={backgroundPosition}
          />
        </Box>
        <Box
          flex="1"
          px="12px"
          pt={["24px", "24px", "24px"]}
          mx={["24px", "24px", 0]}
        >
          <Box py={5}><Text lineHeight="24px" fontSize={3} fontWeight={3} color="darks.2">{headline}</Text></Box>
          <Box py={6}><Text lineHeight="24px" fontSize={3} color="darks.3">{body}</Text></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default InfoSection
