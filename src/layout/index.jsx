import React from 'react'

import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'

export const Layout = ({ title, pages, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <>
      <Header title={title} pages={pages} />
      <main 
        className="main"
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          padding: `${rhythm(2.5)} ${rhythm(3 / 4)} 0`,
        }}
      >
        <ThemeSwitch />  
        {children}
      </main>
      <Footer />
    </>
  )
}
