import { Link } from 'gatsby';
import React from 'react';

interface HeaderProps {
  siteTitle: string;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ siteTitle, categories }) => {

  return (
    <header className="header">
      <Link to="/">{siteTitle}</Link>
      <div className="categories">
        {categories.map((category: string) => <Link to={'/' + category}>{category.toUpperCase()}</Link>)}
      </div>
    </header>
  );
};

export default Header;
