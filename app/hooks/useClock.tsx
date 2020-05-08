import React, { useState, useEffect, useContext } from 'react'

const useTick: () => number = () => {
  const [tick, setTick] = useState<number>(+new Date())

  useEffect(() => {
    const { setInterval, clearInterval } = window as any
    const interval = setInterval(() => {
      const newTick = +new Date()
      // console.log((newTick - tick) / 1000)
      setTick(newTick)
    }, 100)

    return () => { clearInterval(interval) }
  })

  return tick
}

export const ClockContext = React.createContext<number>(+new Date())
export const getTick: () => number = () => useContext(ClockContext)

export const TickProvider: React.FC<any> = ({ children }) => {
  const tick = useTick()

  return <ClockContext.Provider value={tick}>
    {children}
  </ClockContext.Provider>
}
