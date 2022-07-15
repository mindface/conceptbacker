import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <div className="wrapper">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
