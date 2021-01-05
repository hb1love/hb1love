import React from 'react';
import Header from './header';
import Footer from './footer';

import '../style/_reset.scss';
import '../style/style.scss';
import '../style/components/about.scss'
import '../style/components/bio.scss'
import { graphql, useStaticQuery } from 'gatsby';

const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            categories
          }
        }
      }
    `,
  );

  return (
    <>
      <Header siteTitle={`${site.siteMetadata.title}`} categories={site.siteMetadata.categories}/>
      <main className="main">{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
