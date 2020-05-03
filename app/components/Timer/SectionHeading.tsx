import react from 'react'
import styled from 'styled-components'
import { Text } from 'grommet'

const Wrapper = styled.div`
  padding-bottom: 3px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.global.colors['dark-5']};
  text-transform: uppercase;
  letter-spacing: 1px;
`

const SectionHeading: React.FC<{ label: string }> = ({ label }) => (
  <Wrapper>
    <Text weight="bold" color="dark-5" size="small">{label}</Text>
  </Wrapper>
)

export default SectionHeading
