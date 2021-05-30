---
title: '[Swift] Assert, Precondition and Fatal Error'
date: 2020-01-22
category: 'swift'
draft: false
---

스위프트 표준 라이브러리에서 기본적으로 제공하는 함수인 assert, precondition, fatal error 살펴보기.

## 스위프트 최적화 단계

세 함수를 살펴보기 전에 스위프트의 최적화 단계에 무엇이 있는지만 간단히 둘러보자. 우리가 앱을 빌드할 때 컴파일러는 옵션에 따라 코드를 최적화하게 된다. 그리고 Xcode에서 프로젝트를 생성하면 일반적으로 Configuration에 따라서 최적화 옵션이 자동으로 세팅이 된다.

- \-Onone (Xcode의 디버그용 빌드 기본 구성)
- \-O (Xcode의 배포용 빌드 기본 구성)
- \-Ounchecked

여기서 혼동해선 안 되는 점이 있다. `최적화 단계는 디버그, 배포용 빌드와는 별개`이다.  
\-Onone, -O, -Ounchecked 옵션은 디버그, 배포, 미확인 배포를 위한 빌드 구성이 아니다. 스위프트 최적화 단계를 나타내는 옵션일 뿐이다. 다만, Xcode에서 디버그 빌드 구성인 경우에 기본값을 -Onone로 세팅하고 배포 빌드 구성인 경우엔 -O를 기본값으로 세팅한다.

그렇기 때문에 아래에서 설명할 `assert`가 `'배포 빌드에서는 동작하지 않는다?'` 엄밀히 말하면, 틀린 말이다. 최적화 옵션이 -O인 경우에 동작하지 않는다 가 정확한 표현이다. 하지만 아래에서 설명할 때는 자연스러운 흐름을 위해서 배포 빌드에서 동작하지 않는다 라고 표현을 하였다.


## [assert()](https://developer.apple.com/documentation/swift/1541112-assert)

```swift
func assert(_ condition: @autoclosure () -> Bool, _ message: @autoclosure () -> String = String(), file: StaticString = #file, line: UInt = #line)
```

중단을 시켜야 하는 조건문과 출력할 메시지를 전달한다. 실제 `배포하는 빌드에서는 전혀 영향을 미치지 않기 때문에` 내부 새니티 체크를 위해 사용할 수 있다.

- 플레이그라운드와 -Onone (Xcode의 디버그용 빌드 기본 구성) 빌드에서는 조건문 실행 결과가 false라면 message를 출력한 후 프로그램을 중단, 디버깅 가능한 상태로 전환된다.
- -O (Xcode의 배포용 빌드 기본 구성) 빌드에서는 조건문을 검사하지 않으며, 프로그램에 어떠한 영향도 미치지 않는다.
- -Ounckecked 빌드에서는 조건문을 검사하지 않고 항상 true를 반환할 것이라고 가정하고 빌드된다.

## [assertionFailure()](https://developer.apple.com/documentation/swift/1539616-assertionfailure)

```swift
func assertionFailure(_ message: @autoclosure () -> String = String(), file: StaticString = #file, line: UInt = #line)
```

만약 조건문을 검사할 필요없이 중단해야 할 경우 `assert()` 대신 `assertionFailure()`를 사용하면 좀 더 명확한 표현이 된다. assert()와 동일하게 실제 배포에서는 영향을 미치지 않는다.

- 플레이그라운드와 -Onone (Xcode의 디버그용 빌드 기본 구성) 빌드에서 message를 출력한 후 프로그램을 중단, 디버깅 가능한 상태로 전환된다.
- -O 빌드에서는 프로그램에 어떠한 영향을 미치지 않는다.
- -Ounckecked 빌드에서는 이 함수가 절대 실행되지 않는다고 가정하고 빌드한다.

## [precondition()](https://developer.apple.com/documentation/swift/1540960-precondition)

```swift
func precondition(_ condition: @autoclosure () -> Bool, _ message: @autoclosure () -> String = String(), file: StaticString = #file, line: UInt = #line)
```

`assert()`와 동일한 매개 변수에다가 거의 동일한 작업을 수행한다. 유일하면서 가장 큰 차이점 `-Onone 빌드와 -O 빌드에서 동작`한다는 것이다. 

- 플레이그라운드와 -Onone (Xcode의 디버그용 빌드 기본 구성) 빌드에서는 조건문 실행 결과가 false라면 message를 출력한 후 프로그램을 중단, 디버깅 가능한 상태로 전환된다.
- -O (Xcode의 배포용 빌드 기본 구성) 빌드에서는 조건문 결과가 false라면, 프로그램을 중단한다.
- -Ounckecked 빌드에서는 조건문을 검사하지 않고 항상 true를 반환할 것이라고 가정하고 빌드된다.

## [preconditionFailure()](https://developer.apple.com/documentation/swift/1539374-preconditionfailure)

```swift
func preconditionFailure(_ message: @autoclosure () -> String = String(), file: StaticString = #file, line: UInt = #line) -> Never
```

`assertionFailure()`와 매개변수는 동일하다. 다만 `precondition()` 처럼 배포용 빌드에서도 동작한다.

- 플레이그라운드와 -Onone 빌드에서는 message를 출력한 후 프로그램을 중단, 디버깅 가능한 상태로 전환된다.
- -O 빌드에서는 프로그램을 즉각 중단한다.
- -Ounckecked 빌드에서는 이 함수가 절대 실행되지 않는다고 가정하고 빌드한다.

## [fatalError()](https://developer.apple.com/documentation/swift/1538698-fatalerror)

```swift
func fatalError(_ message: @autoclosure () -> String = String(), file: StaticString = #file, line: UInt = #line) -> Never
```

`assertionFailure()`나 `preconditionFailure()`와 동작은 동일하다. 다만, 모든 빌드 구성에서 무조건 종료된다.

한 가지 덧붙이자면, preconditionFailure()와 fatalError()는 디버그 환경에서도, 배포 환경에서도 동작의 차이가 거의 없다. 하지만 배포 환경에서 기본적으로 출력되는 에러 정보들이 fatalError의 경우 상세한 정보들이 너무 많아서 보안상으로 문제가 될 수 있다.