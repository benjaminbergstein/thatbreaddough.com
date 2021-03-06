import { TiHome, TiStopwatch, TiBook, TiCalculator } from 'react-icons/ti'
import styled from 'styled-components'

import {
  Anchor,
  Box,
  Nav,
  Grommet
} from 'grommet'

import NavLink from './NavLink'

const theme = {
  button: {
    extend: ({ colorValue, primary }) => {
      if (colorValue === 'brand' && primary === true) {
        return `
      font-weight: 900;
      color: white;`
      }
      return ''
    }
  },
  global: {
    colors: {
      brand: { dark: '#937674', light: '#937674' }
    },
    font: {
      family: 'Helvetica Neue',
      size: '14px',
      height: '20px'
    }
  }
}

interface Props {
  nav?: boolean;
}
const Layout: React.FC<Props> = ({ nav = true, children }) => (
  <Grommet theme={theme} style={{ height: '100%' }}>
    <Box height={{ min: '100%' }}>
      <Nav direction="row" background={nav ? 'light-1' : 'white'} pad={{ top: '10px', bottom: '8px', horizontal: '12px' }}>
        <NavLink href="/" Icon={TiHome} iconOnly label="Home" />
        <NavLink href="/sourdough-timer" Icon={TiStopwatch} label="Timer" />
        <NavLink href="/sourdough-calculator" Icon={TiCalculator} label="Calculator" />
        <NavLink href="/glossary" Icon={TiBook} label="Glossary" />
      </Nav>
      {children}
      <Footer>&copy; 2020 <Anchor href="http://benjaminbergstein.com?ref=bread_timer">Ben Bergstein</Anchor></Footer>
    </Box>
  </Grommet>
)

const Footer = styled.footer`
  position: relative;
  z-index: 2;
  width: 100%;
  background: white;
  font-size: 10px;
  line-height: 18px;
`

export default Layout
