import React from 'react';
import styled from 'styled-components';

const Title = styled.p`
  margin: 8px 0;
  font-size: 24px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #c7c7c7;
`;

interface Props {
  title: string;
}

export const SectionWrapper: React.FC<Props> = ({ title, children }) => {
  return (
    <section className={`section-wrapper`}>
      <Title>{title}</Title>
      <Separator/>
      {children}
    </section>
  )
};