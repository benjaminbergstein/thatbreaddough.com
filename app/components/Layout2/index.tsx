import styled from 'styled-components'
import System, { Anchor, Box } from '../System'
import Button from '../System/Button'

interface Props {
  nav?: boolean
}

const NavLink: React.FC<any> = (props) => <Button {...props} />
NavLink.defaultProps = {
  color: 'brand',
  plain: true,
  as: 'a',
  fontWeight: 1,
  fontSize: 1,
  marginRight: 2,
}

const Layout: React.FC<Props> = ({ nav = true, children }) => (
  <System>
    <Box minHeight="100%">
      <Box
        display="flex"
        flexDirection="row"
        bg={nav ? "light1" : 'white'}
        paddingTop="10px"
        paddingBottom="8px"
        paddingLeft="12px"
        paddingRight="12px"
      >
        <Box display="flex" flex="1" justifyContent="start">
          <NavLink color="brand" plain as="a" href="/?ref=global_nav" icon='home' />
        </Box>
        <NavLink color="brand" plain as="a" href="/sourdough-timer?ref=global_nav" icon='timer'>Timer</NavLink >
        <NavLink color="brand" plain as="a" href="/glossary?ref=global_nav" icon='book'>Sourdough Glossary</NavLink >
      </Box>
      {children}
      <Footer>&copy; 2020 <Anchor href="http://benjaminbergstein.com?ref=bread_timer">Ben Bergstein</Anchor></Footer>
    </Box>
  </System>
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
