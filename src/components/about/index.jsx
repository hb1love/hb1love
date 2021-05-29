import React from 'react'
import Card from '../card';
import AboutSection from './section';

import './index.scss'

export const About = () => {
  const works = [
    {
      position: 'Mobile Developer',
      corp: 'Coupang Corp.',
      duration: '2020.05 - present',
      desc: (
        <div>
          <p>∙ <b>반응형, 단방향 아키텍처</b>와 <b>Swift</b>를 사용해 Coupang 앱을 개발했습니다.</p>
          <p>∙ <b>클린 아키텍처</b>와 <b>Modular</b>를 적용한 Coupang Wing 판매자센터 앱을 개발했습니다.</p>
          <p>∙ <b>Jenkins</b>와 <b>Fastlane</b>을 활용하여 <b>CI/CD 파이프라인</b>을 구축했습니다.</p>
          <p>∙ 코드 리뷰 문화에 익숙하고 데이터 기반의 의사결정을 존중합니다.</p>
        </div>
      )
    },
    {
      position: 'iOS Developer',
      corp: 'NHN Corp.',
      duration: '2018.01 - 2020.04',
      desc: (
        <div>
          <p>∙ <b>반응형, 단방향 아키텍처</b>와 <b>Swift</b>를 사용해 Dooray! 앱을 개발했습니다.</p>
          <p>∙ <b>모듈화</b> 기술로 여러 제품에서 공통으로 사용하는 공통 모듈을 개발했습니다.</p>
          <p>∙ 광고 모듈을 개발하고 아이엠스쿨 앱에 적용했습니다.</p>
          <p>∙ Xcode 서버를 활용하여 <b>CI/CD 파이프라인</b>을 구축했습니다.</p>
          <p>∙ 앱 개발 <b>표준 가이드</b>(프로젝트 셋팅, 공통 모듈 적용)를 작성하고 배포했습니다.</p>
          <p>∙ 매주 iOS 이슈를 정리하고 토론하는 <b>iOS Weekly</b>를 진행했습니다.</p>
        </div>
      )
    },
  ];

  const projects = [
    {
      name: 'Coupang',
      corp: 'Coupang Corp.',
      duration: '2020.05 - present',
      desc: (
        <div>
          국내 최대의 e커머스 앱입니다. 수백 명의 개발자와 함께 하나의 서비스를 개발하며 놀라운 경험을 하고 있습니다. 높은 자율성과 막대한 책임감이 공존합니다.
          <p>∙ 여행 상품 페이지, 기획전 개발</p>
          <p>∙ A/B 테스트 개발</p>
        </div>
      )
    },
    {
      name: 'Coupang Wing 판매자센터',
      corp: 'Coupang Corp.',
      duration: '2020.06 - present',
      desc: (
        <div>
          Wing은 100만 명의 판매자들이 상품을 팔기 위해 사용하는 쿠팡의 판매자센터 앱입니다.
          <p>∙ 클린 아키텍처와 MVVM+Rx를 전체 적용한 신규 앱 런칭</p>
          <p>∙ Jenkins & Fastlane을 활용한 CI/CD 파이프라인 구축</p>
          <p>∙ Swift, Auto Layout 기반 UI</p>
        </div>
      )
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
          <p>∙ MVVM+Rx, ReactorKit 적용</p>
          <p>∙ Storyboard, Code-based UI</p>
        </div>
      )
    },
    {
      name: '공통 모듈(AppBase)',
      corp: 'NHN Corp.',
      duration: '2019.05 - 2020.04',
      desc: (
        <div>
          앱 개발 조직에서 공통으로 사용하는 모듈의 개발 및 유지 보수를 담당했습니다.
          <p>∙ Remote Config를 활용한 앱 초기설정 주입 모듈(Launching) 개발</p>
          <p>∙ Objective-C to Swift 마이그레이션</p>
          <p>∙ CocoaPods, Swift Package Manager 운영</p>
          <p>∙ 테스트 주도 개발</p>
        </div>
      )
    },
    {
      name: 'iam School',
      corp: 'NHN Edu Corp.',
      duration: '2019.07 - 2020.04',
      desc: (
        <div>
          모바일 학교 알림장 서비스입니다. 네이티브 광고를 로드하고 자동으로 지표를 수집하는 광고 모듈을 개발했습니다.
          <p>∙ Google Ad Manager SDK 광고 패치</p>
          <p>∙ 배너 광고, 동영상 광고 컴포넌트 개발</p>
          <p>∙ Swift, Auto Layout 기반 UI</p>
        </div>
      )
    },
  ];

  const skills = [
    {
      name: 'Mobile Architecture Design',
      score: '⭐️⭐️⭐️',
      desc: `
          앱의 전체적인 구조를 설계하고 패턴을 활용하는 것에 익숙합니다.
        `
    },
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
    <div className="about">
      <div className="card-wrapper">
        <Card>
          <AboutSection title={`👨🏻‍💻 Work`}>
            {works.map((e) => {
              return (
                <div>
                  <div className="about-title">{e.position}</div>
                  <div className="about-corp"><span>{e.corp}</span><span className="about-duration">{e.duration}</span></div>
                  <div className="about-description">{e.desc}</div>
                </div>
              );
            })}
          </AboutSection>
        </Card>
      </div>
      <div className="card-wrapper">
        <Card>
          <AboutSection title={`🚀 Project`}>
            {projects.map((e) => {
              return (
                <div>
                  <div className="about-title">{e.name}</div>
                  <div className="about-corp"><span>{e.corp}</span><span className="about-duration">{e.duration}</span></div>
                  <div className="about-description">{e.desc}</div>
                </div>
              );
            })}
          </AboutSection>
        </Card>
      </div>
      {/* <div className="card-wrapper">
        <Card>
          <AboutSection title={`📚 Skills`}>
            {skills.map((e) => {
              return (
                <div className="skill">
                  <span className="skill-title">{e.name} {e.score}</span>
                  <div className="skill-description">{e.desc}</div>
                </div>
              );
            })}
          </AboutSection>
        </Card>
      </div> */}
      <div className="card-wrapper">
        <Card>
          <AboutSection title={`🎓 Education`}>
            <div>
              <div className="about-title">BACHELOR'S DEGREE, Computer Science & Engineering</div>
              <div className="about-corp"><span>Chungnam National University</span><span className="about-duration">2011 — 2017</span></div>
            </div>
          </AboutSection>
        </Card>
      </div>
      {/* <div className="card-wrapper">
        <Card>
          <AboutSection title={`🕹 Side Projects`}>
          </AboutSection>
        </Card>
      </div> */}
    </div>
  )
}

export default About
