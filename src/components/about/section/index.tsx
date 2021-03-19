import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  width: 740px;
`;

const Title = styled.p`
  margin: 8px 0;
  font-size: 24px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #C7C7C7;
`;

interface Props {
  title: string;
}

export const AboutSection: React.FC<Props> = ({ title, children }) => {
  return (
    <SectionWrapper>
      <Title>{title}</Title>
      <Separator/>
      {children}
    </SectionWrapper>
  )
};