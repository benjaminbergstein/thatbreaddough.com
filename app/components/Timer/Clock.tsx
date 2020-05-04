import React, { useContext } from 'react'
import { formatElapsed, } from '../../utils/timer'
import { getTick } from '../../hooks/useClock'

const Clock: React.FC<any> = ({
  start,
  end,
}) => {
  const tick = getTick()
  const elapsed = (end || tick) - start

  return <span>{formatElapsed(elapsed)}</span>
}

export default Clock
