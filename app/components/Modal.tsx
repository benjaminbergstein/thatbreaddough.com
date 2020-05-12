import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { Box } from './System'
import Button from './System/Button'

interface Props {
  show: boolean;
  onHide: () => void;
}

const Modal: React.FC<Props> = ({ show, onHide, children }) => {
  if (!show) return null

  return (
    <Box
      zIndex="1000"
      position="fixed"
      top="0px"
      left="0px"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      bg="rgba(255, 255, 255, 0.7)"
    >
      <Close onClick={onHide}><FaTimes /></Close>

      {children}

    </Box>
  )
}

const Close = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`

Close.defaultProps = {
  plain: true,
  color: 'darks.4'
}

export default Modal
