import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Text,
  Grid
} from 'grommet'

import useDevice from '../hooks/useDevice'

interface ScreenshotProps {
  backgroundPosition: number;
  first: boolean;
}

const DesktopScreenshot = styled(Box)`
  width: 100%;
  height: 190px;
  margin-top: ${(props: ScreenshotProps) => props.first ? '30px' : '20px'};
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
      width={{ max: '940px' }}
      margin={{ top: first ? 'medium' : 'xlarge', bottom: 'medium' }}
      fill
      flex="grow"
    >
      <Grid fill columns={columns} rows={rows}>
        <Box>
          <Screenshot
            first={first}
            backgroundPosition={backgroundPosition}
          />
        </Box>
        <Box
          pad={{ horizontal: 'medium', top: device === 'mobile' ? 'large' : '0' }}
          margin={{ horizontal: device === 'mobile' ? 'large' : '0' }}
        >
          <Text color='dark-1' as="h2">{headline}</Text>
          <Text color='dark-2' as="p">{body}</Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default InfoSection
