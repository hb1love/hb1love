---
title: 'iOS Clean Architecture with TDD #1. Concept & Structure'
date: 2020-07-16
category: 'architecture'
draft: true
---

> 아키텍처를 위해 투쟁하라. — Robert C. Martin의 클린 아키텍처 중

다소 낯간지러운 말이긴 하지만 우리가 소프트웨어를 개발할 때 생각해야 할 가치를 아주 잘 표현한 말이라고 생각한다. 소프트웨어의 첫 번째 가치가 **행위***behavior*라면 두 번째 가치는 **아키텍처**이다.

## 아키텍처

소프트웨어software라는 단어에 나타나듯이 ‘**부드러운**soft’ 과 ‘**제품**ware’ 이라는 의미를 가진 것이 소프트웨어이다. 소프트웨어를 만드는 이유는 행위(기능)를 쉽게 변경할 수 있도록 하기 위해서다. 존나 아이러니하지 않은가? 소프트웨어를 개발하면서 가장 많이 들은 말이 바꾸기 어렵다는 말이었다.😟

그래 사실 사용자 입장에서야 바꾸기 쉽건 말건 개뿔 하나도 중요한 게 아니다. 어떤 기능을 제공하는지가 소프트웨어를 사용하는 이유이기 때문에 우리는 행위에 집중해왔다.

하지만 소프트웨어가 가진 본연의 목적을 추구하려면 반드시 부드러워야 한다. 변경하기 쉬워야 한다는 뜻이다. 개발자라면 적어도 겨우 기능이 동작하는 소프트웨어를 만드는 게 최종 목표가 되어서는 안 된다. 그렇기에 시스템의 아키텍처는 매우매우 중요하다.
[**클린 아키텍처: 소프트웨어 구조와 설계의 원칙 - 교보문고**
*"살아있는 전설이 들려주는 실용적인 소프트웨어 아키텍처 원칙" 소프트웨어 아키텍처의 보편 원칙을 적용하면 소프트웨어 수명 전반에서 개발자 생산성을 획기적으로 끌어올릴 수 있다. 《클린 코드》와 《클린 코더》의…*www.kyobobook.co.kr](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966262472&orderClick=LEa&Kc=)

이 시리즈에서는 여러 아키텍처가 있지만 그 중에서도 밥 형님이 쓴 클린 아키텍처로 iOS 앱을 만들어 볼 것이다. TDD로 개발할 거지만, TDD가 주는 아니다. 그리고 아키텍처에 대한 전혀 객관적이지 않은 내 생각들이 많이 들어갈 테니 책은 꼭 읽어보길..ㅋㅋ

그리고 앵간하면 다 구현할 테지만, iOS 개발자들이 통상적으로 많이 쓰는 라이브러리들은 되도록이면 다 가져다 쓸 것이다.

## 클린 아키텍처

![photo by clean architecture](https://cdn-images-1.medium.com/max/2000/1*B7LkQDyDqLN3rRSrNYkETA.jpeg)*photo by clean architecture*

밥 형님이 얘기한 [**클린 아키텍처](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)**이다. 나중에 알게 된 사실이지만, Hexagonal Architure를 기저로 하고 있다.

여기서 가장 중요한 것은 **의존성 규칙**이다. 위 이미지에선 밖으로 갈수록 Web, DB 등 기술에 가깝고 안으로 갈수록 비즈니스에 집중하게 된다. 좀 고상한 말로, 외부에서 내부로 들어갈수록 고수준이 된다. 우리는 되도록이면 Web, DB 같은 구체적인 것은 떼어내고 비즈니스를 독립적으로 분리해야 한다. 그렇기 때문에 의존성의 방향이 외부에서 내부로 향하도록 만드는 것이다.

위 이미지가 상당히 추상적이어서 사실 처음 볼 땐 이해하기가 졸라 어렵다. 그러니 앱을 만들면서 뜬구름을 조금씩 걷어 내보자.

## **MovieBook**

간단히 설명하자면 영화 목록을 가져와서 화면에 보여주고 즐겨찾기를 할 수 있는 MovieBook을 만들 것이다.

**기능**은 대충 이렇다.

* API로 영화 목록 가져오기

* 로컬 캐시

* 오류 처리

* 영화 즐겨찾기 표시

* + Advanced Refresh

**준비물(?)**

* Rx에 대한 지식 (1도 모르면 보는데 문제가 없진 않다)

* Xcode ≥ 10.4 (Swift 5.2의 callAsFunction을 사용할거기 때문에 필요함)

### 프로젝트 구성하기

![](https://cdn-images-1.medium.com/max/2796/1*S_SNq6zHadYFbEStcEhMcg.png)

클린 아키텍처만 두고 본다면 크게 3개 레이어로 구분된다. 화면이 구성되는 UI, 비즈니스 로직이 들어갈 Domain, 데이터가 저장된 Data. 이 구조를 따라 앱을 설계할 것이다.

MovieBook 프로젝트를 생성한 뒤 나는 영화라는 도메인을 추가하기 위해서 앱 프로젝트에 코드를 바로 추가하는 게 아니라 프레임워크로 분리시켰다.

![](https://cdn-images-1.medium.com/max/2000/1*5OKz-RkE4uuXUZ7NimnK4g.png)

그리고 Target으로 MovieUI, MovieData, MovieDomain으로 분리하였다. (Movie 타겟을 그대로 둔 이유는 나중에..)

이렇게까지 나누는 이유는 아키텍처의 핵심인 **관심사의 분리**를 위해서다. MovieBook 프로젝트 한 공간에 모든 코드를 넣고 약속에 의해서 의존관계를 잘 지킨다면 문제가 안되겠지만 이게 잘 지켜질 리 만무하다.

iOS의 구조상 프로젝트 내부에 패키지라는 것이 존재하지 않기 때문에 강제할 수 있는 방법도 딱히 존재하지 않는다. 그렇기에 레이어를 나누는 최소 단위가 프레임워크가 된다. 그리고 이렇게 나누는 방식이 빌드 타임에 도움이 된다. 이 주제에 대해 더 알고 싶으면 ‘[Modular Architecture](https://medium.com/flawless-app-stories/a-modular-architecture-in-swift-aafd9026aa99)’를 보고 오면 도움이 될 듯하다.

### UI

![](https://cdn-images-1.medium.com/max/2000/1*de6zMDcuCr2U8U8DrZfCpw.png)

우리가 만들 앱은 화면이 하나밖에 없지만, MovieUI 안에 세부 기능(List, Detail)에 따라 더 나눌 수도 있다. UIKit에 의존하는 유일한 모듈이다.

### Domain

![](https://cdn-images-1.medium.com/max/2000/1*jWVUpYIC8QoxeQnbsacHjw.png)

핵심 비즈니스 로직과 비즈니스 객체만 포함할 것이다. 그리고 다른 레이어들과 완전히 독립적이다.
> 유스케이스는 사용자 관점에서의 기능(비즈니스 로직)을 캡슐화한 클래스이다.

여기서 의문이 드는 게 있다. Domain 계층은 Data 계층의 Repository에서 데이터를 가져올 텐데 어떻게 완전히 독립적으로 나누는가. 결국 Data 계층을 참조해야 하는 거 아닌가?

![](https://cdn-images-1.medium.com/max/2348/1*uP-3c2UXSKDyRlgD8i3Acg.png)

Repositories의 색깔을 반반 섞은 게 이런 이유에서이다. 완전히 하나의 계층에 해당한다고 보기는 애매하다. 이 지점에서 제어흐름과 코드의 의존성은 정반대 방향이 된다. 흔히 이 원리를 **의존성 역전(**Dependency Inversion)이라고 부른다.

![](https://cdn-images-1.medium.com/max/2612/1*iT3rvA6gWCxvk5DszM8zJw.png)

의존성 역전을 이용해서 Domain을 Data와 완전히 독립시키는 방법이다. Repository에 대한 정의(프로토콜)는 Domain에 위치하고 구현체는 Data에 위치한다. 이건 나중에 코드를 보면서 자세히 살펴보자. 😉

### Data

![](https://cdn-images-1.medium.com/max/2000/1*ql3hWupnXrg6QOazHg1OoA.png)

Repository의 구현체와 DataSource로 구성된다. DataSource는 외부(API) 데이터와 내부(캐시, 디비) 데이터로 되어있고 Repository 구현체는 API 데이터를 반환할지, 캐시 데이터를 반환할지 결정하는 역할을 담당한다.

## Next.. 👋

앱 기본 구조를 갖추면서 가장 독립적인 계층인 Domain부터 구현을 할 것이다. 그리고 테스트를 위해서 다소 유명하진 않지만 굉장히 유용한 Mocking 프레임워크인 [Cuckoo](https://github.com/Brightify/Cuckoo)를 사용해 볼 것이다.
