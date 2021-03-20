import React from 'react'
import styled from 'styled-components'
import {
  color,
  typography
} from 'styled-system'
import { FaTrashAlt, FaPlus, FaPlay } from 'react-icons/fa'
import { TiHome, TiStopwatch, TiBook } from 'react-icons/ti'
import Box from '../Box'

type ButtonSize = 'small' | 'normal' | 'large'

const baseProps = {
  outline: "none",
  borderWidth: 0,
  borderRadius: "0",
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  bg: 'brand'
}

interface SizeProps {
  fontSize?: number;
  borderRadius: string;
  height: string;
  paddingLeft: number;
  paddingRight: number;
  fontWeight: number;
}

type Sizes = {
  [size in ButtonSize]: SizeProps
}

const sizeProps: Sizes = {
  small: {
    borderRadius: '4px',
    fontSize: 1,
    paddingLeft: 3,
    paddingRight: 3,
    height: '1.75rem',
    fontWeight: 1
  },
  normal: {
    borderRadius: '6px',
    height: '2rem',
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: 2
  },
  large: {
    borderRadius: '8px',
    fontSize: 2,
    paddingLeft: 4,
    paddingRight: 4,
    height: '2.5rem',
    fontWeight: 1
  }
}

type ButtonIconType = 'trash' | 'add' | 'play' | 'home' | 'timer' | 'book'
const ButtonIcons: { [iconName in ButtonIconType]: any } = {
  trash: FaTrashAlt,
  add: FaPlus,
  play: FaPlay,
  home: TiHome,
  timer: TiStopwatch,
  book: TiBook
}

const ButtonIcon: React.FC<{ icon: ButtonIconType }> = ({ icon }) => {
  const Icon = ButtonIcons[icon]
  return <Box position="relative" top="2px" marginRight="8px">
    <Icon />
  </Box>
}

interface Props {
  bg: string;
  disabled: boolean;
  size: ButtonSize;
  plain?: boolean;
  icon?: ButtonIconType | false;
}

const ButtonFace = styled(Box)`
  ${color}
  ${typography}
  cursor: pointer;
`

const plainProps = {
  bg: 'transparent',
  color: 'unset',
  height: 'unset',
  padding: 0
}

export const Button: React.FC<Props & any> = ({
  plain = false,
  disabled = false,
  size = 'normal',
  icon = false,
  children,
  ...props
}) => {
  const faceProps = {
    ...baseProps,
    ...sizeProps[size],
    ...(plain === true ? plainProps : {}),
    ...props
  }

  if (disabled) {
    faceProps.onClick = function () {
      // do nothing
    }
    faceProps.style = {
      cursor: 'not-allowed',
      opacity: '0.5'
    }
  }

  return <ButtonFace as="button" {...faceProps} disabled={disabled} {...props}>
    {icon && <ButtonIcon icon={icon} />}
    {children !== undefined && children}
  </ButtonFace>
}

export default Button
