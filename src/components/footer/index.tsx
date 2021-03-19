import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 240px;
  background: #ffffff;

  a {
    box-sizing: border-box;
    padding: 16px;
    font-size: 18px;
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

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Link to="https://github.com/hb1love">@Jayce Kim</Link>
    </FooterWrapper>
  );
}

export default Footer;
