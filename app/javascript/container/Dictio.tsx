import React, { useState } from 'react'
import Layout from '../component/core/Layout'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

import SectionLevelerList from '../component/SectionLevelerList'

function Dictio() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <SectionLevelerList />
        </Layout>
      </ThemeProvider>
    </div>
  )
}

export default Dictio
