import React from 'react'
import ServiceStatus from '../../components/ServiceStatus'
import ServiceInterval from '../../components/ServiceInterval'
import Tracking from '../../components/Tracking'

import { HomeContainer } from './styles'

const Home = () => {
  return (
    <HomeContainer>
      <Tracking />
      <ServiceStatus />
      <ServiceInterval />
    </HomeContainer>
  )
}

export default Home
