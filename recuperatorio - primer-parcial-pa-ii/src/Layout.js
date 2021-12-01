import React from 'react'
import Header from './components/Header'

const Layout = (Page) => {
    return (
        <>
          <Header />
          <Page />  
        </>
    )
}

export default Layout
