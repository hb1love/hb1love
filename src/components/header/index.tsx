import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 54px;
  background: #ffffffdd;
  z-index: 1;

  a {
    box-sizing: border-box;
    padding: 16px;
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
`;

interface HeaderProps {
  siteTitle: string;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ siteTitle, categories }) => {

  return (
    <HeaderWrapper>
      <Link to="/">{siteTitle}</Link>
      <div className="categories">
        {categories.map((category: string) => <Link to={'/' + category}>{category.toUpperCase()}</Link>)}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
