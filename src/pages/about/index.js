import { graphql } from 'gatsby'
import _ from 'lodash'
import React from 'react'
import { Layout } from '../../layout'
import { SEO } from '../../components/seo'
import { Bio } from '../../components/bio'
import { About } from '../../components/about'
import { rhythm } from '../../utils/typography'

import './index.scss'

export default ({ data }) => {
  const { siteMetadata } = data.site

  return (
    <Layout>
      <div className="about-page" style={{ maxWidth: rhythm(50) }}>
        <SEO title="About" keywords={siteMetadata.keywords} />
        <Bio/>
        <About/>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        pages
      }
    }
  }
`
