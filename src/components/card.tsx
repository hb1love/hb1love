import React from 'react';
import styled from 'styled-components';

const CardWidget = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 36px;
`;

const Card: React.FC = ({ children }) => {
  return (
    <CardWidget>
      {children}
    </CardWidget>
  );
};

export default Card;