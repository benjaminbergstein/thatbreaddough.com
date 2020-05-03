import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { Box, Text, Layer } from 'grommet'

interface Props {
  show: boolean
  onHide: () => void
}

const Modal: React.FC<Props> = ({ show, onHide, children }) => {
  if (!show) return null

  return (
    <Layer
      onEsc={() => onHide()}
      onClickOutside={onHide}
    >
      <Box pad={{ vertical: 'medium', horizontal: 'large' }}>
        <Close size="medium" color="dark-3" onClick={onHide}><FaTimes /></Close>
        {children}
      </Box>
    </Layer>
  )
}

const Close = styled(Text)`
  position: absolute;
  top: 8px;
  right: 8px;
`

export default Modal
