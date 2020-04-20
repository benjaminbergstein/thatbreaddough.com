import React, { useState, useEffect } from 'react'
import { Main } from 'grommet'

import Layout from '../components/Layout'
import Timer from '../components/Timer'

const TimerPage: React.FC<any> = () => {
  return <Layout>
    <Main pad="large" align="center">
      <Timer />
    </Main>
  </Layout>
}

export default TimerPage
