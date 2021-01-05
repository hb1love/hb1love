import React from 'react';
import { SectionWrapper } from './section-wrapper';
import Card from '../components/card';
import styled from 'styled-components';

const CardWrapper = styled.div`
  margin: 36px 0;
`;

export const About: React.FC = () => {
  const works = [
    {
      position: <b>Mobile Developer</b>,
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
      name: 'Coupang mobile',
      corp: 'Coupang Corp.',
      duration: '2020.05 - present',
      desc: ""
    },
    {
      name: 'Wing mobile',
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
  const skills = {
    advanced: [
      'Swift & RxSwift',
      'Mobile Architecture Design',
      'Auto Layout/Storyboard UI Development'
    ],
    intermediate: [
      'Quick & Nimble Testing',
      'Agile Development',
      'Git & Tools'
    ],
    beginner: [
      'Javascript & Typescript',
      'CSS & Sass'
    ]
  };

  const side_projects = [
    {
      name: 'Podolist',
      store: '',
      desc: ''
    },
    {
      name: 'Lunar',
      store: '',
      desc: ''
    },
    {
      name: 'Wepet',
      store: '',
      desc: ''
    },
    {
      name: 'Travelable',
      store: '',
      desc: ''
    },
  ];

  return (
    <div className={`about`}>
      <CardWrapper>
        <Card>
          <SectionWrapper title={`👨🏻‍💻 Work`}>
            {works.map((work) => {
              return (
                <div>
                  <div className={`title`}>{work.position}</div>
                  <div className={`corp`}>
                    <span>{work.corp}</span><span className={`duration`}>{work.duration}</span>
                  </div>
                  <div className={`description`}>{work.desc}</div>
                </div>
              );
            })}
          </SectionWrapper>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <SectionWrapper title={`🚀 Projects`}>
            {projects.map((project) => {
              return (
                <div>
                  <div className={`title`}>{project.name}</div>
                  <div className={`corp`}>
                    <span>{project.corp}</span><span className={`duration`}>{project.duration}</span>
                  </div>
                  <div className={`description`}>{project.desc}</div>
                </div>
              );
            })}
          </SectionWrapper>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <SectionWrapper title={`📚 Skills`}>

          </SectionWrapper>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <SectionWrapper title={`🎓 Education`}>
            <div>
              <div className={`title`}>BACHELOR'S DEGREE, Computer Science & Engineering</div>
              <div className={`corp`}>
                <span>Chungnam National University</span><span className={`duration`}>2011 — 2017</span>
              </div>
            </div>
          </SectionWrapper>
        </Card>
      </CardWrapper>
      <CardWrapper>
        <Card>
          <SectionWrapper title={`🕹 Side Projects`}>

          </SectionWrapper>
        </Card>
      </CardWrapper>
    </div>
  );
};

export default About;