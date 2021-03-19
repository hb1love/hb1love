import React from 'react';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import Bio from '../../components/bio';
import About from '../../components/about';

const IndexPage = () => (
  <Layout>
    <SEO title="About"/>
    <Bio/>
    <About/>
  </Layout>
);

export default IndexPage;