import React, { useState } from 'react'
import SectionDataList from '../component/SectionDataList'
import Layout from '../component/core/Layout'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <SectionDataList />
        </Layout>
      </ThemeProvider>
    </div>
  )
}

export default App
