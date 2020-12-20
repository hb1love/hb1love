import { Link } from 'gatsby';
import React from 'react';

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header className="header">
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    Header 영역입니다. 스타일은 style.scss에서 지정합니다.
  </header>
);

export default Header;
