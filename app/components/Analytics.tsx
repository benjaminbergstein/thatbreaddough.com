import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

let Initialized = false

export const initAnalytics  = () => {
  if (!Initialized) {
    ReactGA.initialize('UA-31193988-4')
    Initialized = true
  }
}

export const usePageView = (title) => {
  useEffect(() => {
    try {
      initAnalytics()
      const { location } = window as any
      ReactGA.pageview(location.pathname + location.search)
    } catch (e) {}
  }, [title])

  return null
}

const Analytics: React.FC<any> = ({ pageView = null }) => {
  if (pageView !== null) usePageView(pageView)
  return null
}

export default Analytics
