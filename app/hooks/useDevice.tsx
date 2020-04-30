import React, { useState, useEffect } from 'react'

export type DeviceType = 'desktop' | 'tablet' | 'mobile'

const useDevice: () => DeviceType = () => {
  const [device, setDevice] = useState<DeviceType>('desktop')

  const detectDevice = () => {
    if (!window) return
    const { innerWidth } = window

    if (innerWidth < 400) setDevice('mobile')
    else setDevice('desktop')
  }

  useEffect(() => {
    detectDevice()
    const listener = (e: any) => detectDevice()
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  })

  return device
}

export default useDevice
