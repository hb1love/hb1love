import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'

export const ShortBio = () => (
  <StaticQuery
    query={shortBioQuery}
    render={data => {
      const { author, social, introduction } = data.site.siteMetadata

      return (
        <div className="short-bio">
          <div className="author">
            <Image
              className="author-image"
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                borderRadius: `100%`,
              }}
            />
            <div className="author-description">
              <div className="author-name">
                <span className="author-name-prefix">Written by</span>
                <Link to={'/about'} className="author-name-content">
                  <span>@{author}</span>
                </Link>
              </div>

              <div className="author-introduction">{introduction}</div>
                <p className="author-socials">
                  {social.instagram && (
                    <a href={`https://www.instagram.com/${social.instagram}`}>
                      Instagram
                    </a>
                  )}
                  {social.github && (
                    <a href={`https://github.com/${social.github}`}>GitHub</a>
                  )}
                  {social.medium && (
                    <a href={`https://medium.com/${social.medium}`}>Medium</a>
                  )}
                  {social.twitter && (
                    <a href={`https://twitter.com/${social.twitter}`}>
                      Twitter
                    </a>
                  )}
                  {social.facebook && (
                    <a href={`https://www.facebook.com/${social.facebook}`}>
                      Facebook
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
                      LinkedIn
                    </a>
                  )}
                </p>
            </div>
          </div>
        </div>
      )
    }}
  />
)

const shortBioQuery = graphql`
  query ShortBioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 72, height: 72) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          medium
          facebook
          linkedin
          instagram
        }
      }
    }
  }
`

export default ShortBio
