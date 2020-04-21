import React, { useState, useEffect } from 'react'
import {
  formatElapsed,
} from '../../utils/timer'

const Clock: React.FC<any> = ({
  start,
  end,
}) => {
  const [tick, setTick] = useState<number>(+new Date())
  const elapsed = (end || tick) - start

  useEffect(() => {
    const { setInterval, clearInterval } = window as any
    const interval = setInterval(() => {
      setTick(+new Date())
    }, 100)

    return () => { clearInterval(interval) }
  }, [start, end])

  return <span>{formatElapsed(elapsed)}</span>
}

export default Clock
