---
title: 'iOS Clean Architecture with TDD #2. Entities & Use Cases'
date: 2020-07-17
category: 'architecture'
draft: false
---

이번엔 지난 포스트에서 생성한 MovieBook 프로젝트에서 다른 계층의 영향을 받지 않는 Domain을 개발할 것이다. 추후 과정은 외부 영향도가 적은 **내부 계층**부터 **외부 계층 **순으로 진행한다. 의존성을 가진 계층을 먼저 개발하게 되면 명확하지 않은 의존 객체의 명세에 의해서 얼 타는 수가 생긴다.

## 준비

[Cocoapods](https://cocoapods.org/)을 이용해 우리가 사용할 라이브러리를 추가할 것이다. 우선 당장 필요한 Rx와 테스팅 라이브러리만 추가하자.

<iframe src="https://medium.com/media/a6a8db374c4bbbe400fed1a5f0696196" frameborder=0></iframe>

팟에 대해서 한 가지 첨언을 하자면, MovieBook 프로젝트에서는 실제로 Rx를 사용하는 코드가 없지만 하위 모듈인 MovieDomain에서 사용하기 때문에 의존성을 같이 추가해 줘야 한다. 살짝 이상하게 느껴지지만 팟의 한계(?)라고만 알고 일단은 넘어가자.

## Entity

MovieBook에서 필요한 가장 중요한 데이터가 무엇일까. 당연 Movie이다. 보통 API에 따라 Entity 의 형태를 결정하는 경우가 많은데, API 응답이 바뀔 때마다 Entity가 바뀌는 구조는 이상적이지 않다. 당연히 API 모델은 따로 분리하는 걸 추천한다.

<iframe src="https://medium.com/media/3fef185e87cd19ec5d4cc32aa121d33c" frameborder=0></iframe>

Movie가 추후에 class로 바뀔 순 있지만, 일단은 struct로 만들었다. 그리고 테스트엔 기본으로 Equality 체크가 들어가니 Equatable 프로토콜을 따르게 하자.

## Use Case

Usecase는 비즈니스 로직이 실행되는 곳이다. 사실 MovieBook 앱 자체에 기능이 거의 없어서.. 🙄 코드가 많진 않을 것이다. GetMoviesUsecase와 SetBookmarkUsecase , 두 케이스만 추가를 해보자.

### Async Handling

Usecase의 할 일 중 하나가 Repository에서 데이터를 가져오는 것이다. 데이터를 받아오는 과정은 비동기를 기본으로 한다. Rx 이전에는 Completion Block을 넘기는 방식으로 비동기를 많이 다루었지만 나는 Rx를 써서 모든 코드를 더 가독성 좋게 만들 것이다. 🚀

### Repository

앞서 언급했던 것처럼 Domain 계층의 독립성을 위해 Repository에 대한 정의는 Domain에 위치하지만 구현체는 Data에 있다. MovieRepositoryProtocol을 Domain에 추가하자.

<iframe src="https://medium.com/media/f3648034ab87935fbbd1e9e3832d2c07" frameborder=0></iframe>

getMovies는 추후 Advanced refresh를 위해서 이벤트가 여러 번 전달될 수 있는 Observable로 정의하였고 setBookmark는 단발성 이벤트를 전달하는 Single로 정의하였다.

## 테스트 준비

이제 앞서 정의한 Usecase에 대한 테스트 코드를 작성할 것이다. 하지만 알다시피 우린 고작 MovieRepositoryProtocol만 추가했기 때문에 테스트에 필요한 나머지 부분은 모두 Cuckoo를 써서 Mocking을 할 것이다.
> Cuckoo는 컴파일 타임에 원하는 클래스나 프로토콜에 대한 **Mock Object**를 생성해 주는 **Mocking framework**이다. 다양한 유스케이스를 테스트할 때 굉장히 유용하게 사용할 수 있다.

우선 Cuckoo로 Mock Object를 생성하기 위해서 스크립트를 추가해야 한다.

![MovieDomainTests 타겟의 Build Phases에 스크립트를 추가한다.](https://cdn-images-1.medium.com/max/4852/1*6kT8y6h_pJkPxO7wS2zs_A.png)*MovieDomainTests 타겟의 Build Phases에 스크립트를 추가한다.*

테스트를 작성하고자 하는 타겟(MovieDomainTests)의 Build Phases로 이동해서 아래의 스크립트를 추가하자(Compile Sources Phase 위에 추가해야 한다). 디렉터리 이름은 각자에 맞게 조금씩 수정하면 된다.

<iframe src="https://medium.com/media/b2cd7df11988bf6d2cba3db288c3f8fc" frameborder=0></iframe>

빌드를 한번 돌려보면 우리가 OUTPUT_FILE 로 지정한 곳에 ooMocks.swift 파일이 생겨났을 것이다. 이것을 아래처럼 프로젝트에 포함시키자.

![](https://cdn-images-1.medium.com/max/2000/1*vYTWRnIXtEpJFnTaCOqkfg.png)

앞으로 Mocking이 필요한 클래스를 위의 스크립트에서 맨 아랫줄에 하나씩 추가하면서 테스트를 진행할 것이다. 이걸로 준비는 끝! 💪

## 테스트 코드를 작성해보자!

MovieDomainTests에 MovieDomain 모듈과 똑같이 미러링 해서 GetMoviesUsecase.swift와 GetMoviesUsecaseSpec.swift를 추가하자. 테스트 프레임워크로 [XCTest](https://developer.apple.com/documentation/xctest)를 사용한다면 GetMoviesUsecaseTests라고 지었겠지만 [Quick](https://github.com/Quick/Quick)의 컨벤션에 따라 GetMoviesUsecaseSpec으로 만들었다.

![](https://cdn-images-1.medium.com/max/2000/1*8kRIFxRcKnA6wmv3EHXnEg.png)

빈 파일안에 아래처럼 필요한 프레임워크들을 import하자

<iframe src="https://medium.com/media/fe828935969e7faedd1630b504d2d7f3" frameborder=0></iframe>

이제 spec() 안에 우리가 테스트할 코드를 일단은 상상으로 짤 것이다. 테스트 대상인 usecase를 생성하고 usecase가 참조하는 repository를 Mock으로 생성해서 주입해 줄 것이다.

<iframe src="https://medium.com/media/8d2c2529b06a035f010346bde067cd8a" frameborder=0></iframe>
> ⚠️ 아직 GetMoviesUsecase 클래스를 만들지 않았기 때문에 당연히 빨간 줄이 표시된다. **Welcome to TDD!** 이걸 하나하나 잡아갈 것이다.

**beforeEach**는 각 테스트가 동작하기 전에 실행되는 블록이다. 이곳에서 주로 객체를 초기화하는 작업을 한다.

이제 오류를 없애야 할 차례이다. GetMoviesUsecase.swift 파일로 가서 초기화할 때 MovieRepositoryProtocol를 주입받는 GetMoviesUsecase 클래스를 만들자.

<iframe src="https://medium.com/media/1f7152c63bfbae84d38236c272f1adab" frameborder=0></iframe>

오류가 사라졌으니 실제 테스트 코드를 작성할 것이다. 워낙 간단한 유스케이스라 로직이 별로 없다. usecase()를 호출 시 영화 리스트를 잘 가져오는지 테스트하는 코드를 작성해보자.

<iframe src="https://medium.com/media/9a4847e9df1bfece965dcd1dba005513" frameborder=0></iframe>

테스트 코드를 작성할 때 3 단계로 나눌 수 있다.

* **준비(Arrange) **— 테스트 코드를 실행하기 전에 적절한 상태로 객체들을 생성하거나 인터랙션이 발생하는 경우 외부의 영향을 받지 않기 위해 가짜로 대체한다.

* **실행(Act) **— 테스트 코드를 실행한다. 보통은 단일 메서드를 호출한다.

* **단언(Assert)** — 실행한 코드가 기대한 대로 동작하는지 확인한다. 반환값 혹은 그 외 필요한 객체들의 상태를 검사한다. 혹은 인터랙션을 검사하기도 한다.

테스트 자체는 워낙 간단하기 때문에 몇 가지 메서드만 설명을 하자면, toBlocking() 은 비동기로 데이터가 전달되는 Rx의 특성상 그대로는 테스트하기가 힘들어서 Observable 시퀀스를 Blocking Observable로 변환해 주는 RxBlocking의 기능 중 하나이다.

verify(movieRepository, times(1)).getMovies()는 movieRepository의 getMovies 메서드가 한 번 호출되었는지 확인하는 것이고, 주로 테스트에서 요구하는 인터랙션이 정상적으로 일어났는지 확인하기 위해 사용한다.

테스트 코드를 작성했지만 아직 usecase의 메서드를 구현하지 않았기 때문에 당연히 실패한다. 사실은 컴파일도 되지 않는다. 다시 GetMoviesUsecase로 돌아가서 메서드를 추가하자.

<iframe src="https://medium.com/media/fd586951919b70bfc9d8fcde9e192465" frameborder=0></iframe>

첫 유스케이스가 완성되었다. 여기까지 코드를 잘 작성했으면 테스트가 정상적으로 통과할 것이다!! 🎉

## Next..👋

모든 서비스에서 에러를 다루는 건 성공 케이스를 제어하는 것만큼이나 중요하다. 그렇기에 에러 처리를 위한 에러 타입들을 정의하고 에러를 핸들링하는 코드를 작성해보자. 그리고 아직 하나 남은 SetBookmarkUsecase를 추가할 것이다. 😉
