// import React from 'react'
// import { Link } from 'gatsby'

// import './index.scss'

// export const Header = ({ title, pages }) => {
//   return (
    // <header className="header">
    //   <Link to="/">{title}</Link>
    //   <div className="pages">
    //     {pages.map(page => <Link to={page[1]}>{page[0]}</Link>)}
    //   </div>
    // </header>
//   )
// }


import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import './index.scss'

export const Header = () => (
  <StaticQuery
    query={headerQuery}
    render={data => {
      const { title, pages } = data.site.siteMetadata
      
      return (
        <header className="header">
          <Link to="/">{title}</Link>
          <div className="pages">
            {pages.map(page => <Link to={page[1]}>{page[0]}</Link>)}
          </div>
        </header>
      )
    }}
  />
)

const headerQuery = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        pages
      }
    }
  }
`

export default Header
