import { useEffect } from 'react'
import ReactGA from 'react-ga'

let Initialized = false

export const initAnalytics: () => void = () => {
  if (!Initialized) {
    ReactGA.initialize('UA-31193988-4')
    Initialized = true
  }
}

export const usePageView: (title: string) => null = (title) => {
  useEffect(() => {
    try {
      initAnalytics()
      const { location } = window
      ReactGA.pageview(location.pathname + location.search)
    } catch (e) {}
  }, [title])

  return null
}

interface Props {
  pageView: string | null;
}

const Analytics: React.FC<Props> = ({ pageView = null }) => {
  if (pageView !== null) usePageView(pageView)
  return null
}

export default Analytics
