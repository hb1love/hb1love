import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import * as Elements from '../components/elements'
import { Layout } from '../layout'
import { SEO } from '../components/seo'
import { PostTitle } from '../components/post-title'
import { PostDate } from '../components/post-date'
import { PostContainer } from '../components/post-container'
import { SponsorButton } from '../components/sponsor-button'
import { ShortBio } from '../components/short-bio'
import { PostNavigator } from '../components/post-navigator'
import { Utterances } from '../components/utterances'
import { rhythm } from '../utils/typography'
import * as ScrollManager from '../utils/scroll'

import '../styles/code.scss'
import 'katex/dist/katex.min.css'

export default ({ data, pageContext }) => {
  useEffect(() => {
    ScrollManager.init()
    return () => ScrollManager.destroy()
  }, [])

  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const { comment, author, sponsor } = metaData
  const { utterances } = comment
  const { title: postTitle, date } = post.frontmatter
  
  return (
    <Layout>
      <div style={{ maxWidth: rhythm(24) }}>
        <SEO title={postTitle} description={post.excerpt} />
        <PostTitle title={postTitle} />
        <PostDate date={date} />
        <PostContainer html={post.html} />
        <Elements.Hr />
        <ShortBio />
        {!!sponsor.buyMeACoffeeId && (
          <SponsorButton sponsorId={sponsor.buyMeACoffeeId} />
        )}
        <PostNavigator pageContext={pageContext} />
        {!!utterances && <Utterances repo={utterances} />}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        pages
        comment {
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
