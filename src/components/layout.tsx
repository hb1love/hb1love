import React from 'react';
import Header from './header';
import Footer from './footer';

import '../style/reset.scss';
import '../style/style.scss';

const Layout: React.FC = ({ children }) => (
  <>
    <Header siteTitle={'meta'} />
    <main className="main">{children}</main>
    <Footer />
  </>
);

export default Layout;
