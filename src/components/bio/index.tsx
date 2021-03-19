import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Card from '../card'
import styled from 'styled-components'

const BioWidget = styled.div`
  position: sticky;
  top: 6em;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-right: 4em;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 240px;

  img {
    border-radius: 50%;
  }
`

const Name = styled.div`
  padding: 24px 0;
  font-size: 26px;
  font-weight: bold;
`

const Introduction = styled.div`
  font-size: 16px;
  line-height: 24px;
  max-width: 240px;

  p {
    padding-bottom: 8px;
  }
`

const VCard = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  padding: 24px 0;
`

const VCardLi = styled.li`
  display: flex;
  padding: 8px 0;

  a {
    font-size: 16px;
    color: #8797AF;
    transition: 0.3s;

    &:visited {
      color: #8797AF;
    }

    &:hover {
      color: violet;
    }
  }

  svg {
    margin-right: 8px;
  }
`

const Bio: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "cat.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 240) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <BioWidget>
      <Card>
        <Profile><Image fluid={data.file.childImageSharp.fluid}/></Profile>
        <Name>Kim Heebeom</Name>
        <Introduction>
          <p>I ❤️ 👨🏻‍💻📱🧗🚴🎯🏓⚽☕️🍶🍺🍣🍜🍔🍓🍌🌧❄✈️️</p>
          Everyone thinks of changing the world, but no one thinks of changing himself. - Leo Tolstoy
        </Introduction>
        <VCard>
          <VCardLi>
            <a href={"https://www.coupang.com/"} target={"_blank"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                <path
                  d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
              </svg>
              Coupang Corp.
            </a>
          </VCardLi>
          <VCardLi>
            <a href={"https://goo.gl/maps/9KwbEcDJErx5u9ATA"} target={"_blank"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path
                  d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
              Jamsil & Pangyo
            </a>
          </VCardLi>
          <VCardLi>
            <a href={"mailto:heebuma@gmail.com"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
              </svg>
              heebuma@gmail.com
            </a>
          </VCardLi>
        </VCard>
      </Card>
    </BioWidget>
  )
};

const BioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/cat.jpg" }) {
      childImageSharp {
        fixed(maxwidth: 240) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Bio;