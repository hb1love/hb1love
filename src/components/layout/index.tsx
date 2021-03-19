import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { graphql, useStaticQuery } from 'gatsby';

import '../../styles/styles.scss';

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
