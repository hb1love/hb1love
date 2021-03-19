import React from 'react';
import { AboutSection } from './section';
import Card from '../card';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  margin-right: 20rem;
`

const CardWrapper = styled.div`
  margin-top: 36px;
`;

const Title = styled.div`
  margin-top: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const Corp = styled.div`
  margin-top: 8px;
  font-size: 18px;
`;

const Duration = styled.span`
  margin-left: 10px;
  font-size: 16px;
  color: #a0a0a0;
  font-style: italic;
`;

const Description = styled.div`
  padding: 16px 0;
  font-size: 16px;

  p {
    padding-top: 8px;
  }

  b {
    font-weight: bold;
  }
`;

const Skill = styled.div`
  margin-top: 24px;
`;

const STitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const SDescription = styled.div`
  padding: 16px 0;
  font-size: 16px;
  line-height: 20px;
`;

export const About: React.FC = () => {
  const works = [
    {
      position: 'Mobile Developer',
      corp: 'Coupang Corp.',
      duration: '2020.05 - present',
      desc: ""
    },
    {
      position: 'iOS Developer',
      corp: 'NHN Corp.',
      duration: '2018.01 - 2020.04',
      desc: (
        <div>
          <p>∙ <b>반응형, 단방향 아키텍처</b>와 <b>Swift</b>를 사용해 Dooray! 앱을 개발했습니다.</p>
          <p>∙ 모듈화 기술로 여러 제품에서 공통으로 사용하는 공통 모듈을 개발했습니다.</p>
          <p>∙ 광고 모듈을 개발하고 아이엠스쿨 앱에 적용했습니다.</p>
          <p>∙ Xcode 서버를 활용하여 빌드/배포 환경을 구축했습니다.</p>
          <p>∙ 앱 개발 표준 가이드(프로젝트 셋팅, 공통 모듈 적용)를 작성하고 배포했습니다.</p>
          <p>∙ 매주 iOS 이슈를 정리하고 토론하는 iOS Weekly를 진행했습니다.</p>
        </div>
      )
    },
  ];

  const projects = [
    {
      name: 'Coupang',
      corp: 'Coupang Corp.',
      duration: '2020.05 - present',
      desc: ""
    },
    {
      name: 'Wing',
      corp: 'Coupang Corp.',
      duration: '2020.06 - present',
      desc: ""
    },
    {
      name: 'Dooray!',
      corp: 'NHN Corp.',
      duration: '2018.03 - 2020.04',
      desc: (
        <div>
          프로젝트, 메신저, 메일, 캘린더, 드라이브, 위키와 같이 온라인에서 협업하는데 필요한 도구를 통합하여 제공하는 서비스입니다.
          <p>∙ 프로젝트, 메일, 캘린더 유지 보수 및 개발</p>
          <p>∙ 위키, 드라이브 신규 개발</p>
          <p>∙ ReactorKit & RxSwift 적용</p>
        </div>
      )
    },
    {
      name: 'AppBase',
      corp: 'NHN Corp.',
      duration: '2019.05 - 2020.04',
      desc: (
        <div>
          앱 개발 조직에서 공통으로 사용하는 모듈의 개발 및 유지 보수를 담당했습니다.
          <p>∙ Objective-C to Swift 마이그레이션</p>
          <p>∙ Remote Config를 활용한 설정 주입 모듈(Launching) 개발</p>
        </div>
      )
    },
    {
      name: 'iam School',
      corp: 'NHN Edu Corp.',
      duration: '2019.07 - 2020.04',
      desc: (
        <div>
          모바일 학교 알림장 서비스입니다. 광고 모듈을 개발했습니다.
          <p>∙ Google Ad Manager SDK 광고 패치</p>
          <p>∙ 배너 광고, 동영상 광고 컴포넌트 개발</p>
        </div>
      )
    },
  ];

  const skills = [
    {
      name: 'Swift & RxSwift',
      score: '⭐️⭐️⭐️⭐️',
      desc: `
          My "native" programming language, I've worked with it for over 4 years.
          I've used it in the front-end with React and Redux, in the back-end for APIs with Node,
          Express and Hapi.js and for testing automation using Mocha and later on, Jest.
        `
    },
    {
      name: 'Testing',
      score: '⭐️⭐️⭐️',
      desc: `
          My "native" programming language, I've worked with it for over 4 years.
          I've used it in the front-end with React and Redux, in the back-end for APIs with Node,
          Express and Hapi.js and for testing automation using Mocha and later on, Jest.
        `
    },
    {
      name: 'Mobile Architecture Design',
      score: '⭐️⭐️⭐️',
      desc: `
          My "native" programming language, I've worked with it for over 4 years.
          I've used it in the front-end with React and Redux, in the back-end for APIs with Node,
          Express and Hapi.js and for testing automation using Mocha and later on, Jest.
        `
    }
  ];

  const side_projects = [
    {
      name: 'MEDIAMUG',
      store: '',
      desc: ''
    },
    {
      name: 'Fantazia',
      store: '',
      desc: ''
    },
    {
      name: 'Travelable',
      store: '',
      desc: ''
    },
    {
      name: 'Lunarrr',
      store: '',
      desc: ''
    },
    {
      name: 'Podolist',
      store: '',
      desc: ''
    },
  ];

  return (
    <AboutWrapper>
      <CardWrapper>
        <Card>
          <AboutSection title={`👨🏻‍💻 Work`}>
            {works.map((e) => {
              return (
                <div>
                  <Title>{e.position}</Title>
                  <Corp><span>{e.corp}</span><Duration>{e.duration}</Duration></Corp>
                  <Description>{e.desc}</Description>
                </div>
              );
            })}
          </AboutSection>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <AboutSection title={`🚀 Projects`}>
            {projects.map((e) => {
              return (
                <div>
                  <Title>{e.name}</Title>
                  <Corp><span>{e.corp}</span><Duration>{e.duration}</Duration></Corp>
                  <Description>{e.desc}</Description>
                </div>
              );
            })}
          </AboutSection>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <AboutSection title={`📚 Skills`}>
            {skills.map((e) => {
              return (
                <Skill>
                  <STitle>{e.name} {e.score}</STitle>
                  <SDescription>{e.desc}</SDescription>
                </Skill>
              );
            })}
          </AboutSection>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <AboutSection title={`🎓 Education`}>
            <div>
              <Title>BACHELOR'S DEGREE, Computer Science & Engineering</Title>
              <Corp><span>Chungnam National University</span><Duration>2011 — 2017</Duration></Corp>
            </div>
          </AboutSection>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <AboutSection title={`🕹 Side Projects`}>

          </AboutSection>
        </Card>
      </CardWrapper>
    </AboutWrapper>
  );
};

export default About;