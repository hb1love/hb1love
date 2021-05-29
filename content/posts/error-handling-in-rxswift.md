---
title: '[Swift] Error Handling in RxSwift'
date: 2019-04-14
category: 'swift'
draft: false
---

에러핸들링은 Rx에서 가장 다루기 까다로우면서도 꼭 필요한 녀석입니다. 같은 동작이어도 어느 상황에서는 스트림이 깨지지 않고 유지되어야 할 테고, 어느 상황에는 스트림을 종료해야 하는데 처음 Rx를 접하면 쉽지 않은 작업이다.

## 에러 핸들링
크게 두 종류의 핸들링 방식이 있고, 이 틀을 벗어나진 않는다.

### Catch
일반적인 프로그래밍 언어의 __try__, __catch__ 와 비슷한 의미를 가진다. 에러가 발생하면 catch를 하고 던져버린다.

### Retry
에러가 발생하면 특정 조건에 따라 스트림을 재시도한다.

<br/>
<br/>

## Catch를 이용한 에러 처리
catch 계열에는 두 가지의 주요 연산자가 있다.

### catchError
```swift
func catchError(_ handler:) -> RxSwift.Observable<Self.E>
```
- 클로저를 매개변수롤 받아서 새로운 형태의 **Observable**로 변환한다.
- 아래 예시는 *error* 이벤트를 받아서 조건에 따라 *next*이벤트로 치환한다.

```swift
Observable<Weather>
  .concat([.error(MyError.requestError1),
           .just(.hot)])
  .catchError { error -> Observable<Weather> in
    print(.catchError, error)
    if case MyError.requestError1 = error {
      return .just(.cloudy)
    }
    return .just(.cold)
  }
  .subscribe(
    ...
  ).disposed(by: disposeBag)
  
// 출력
// catchError: requestError1
// onNext: cloudy
// onCompleted
```
1. **MyError.requestError1**이 error 이벤트로 방출되고, 뒤이어 **Weather.hot**이 next 이벤트로 전달된다.
2. *catchError*에서는 에러가 **MyError.requestError1**인 경우에 .cloudy를 담은 next이벤트로, 그 외엔 .cold를 담은 이벤트로 치환한다.
3. subscribe에서는 onError로 이벤트를 받는 것이 아니라, onNext로 오는 .cloudy를 받게 된다.
4. *catchError*를 한번이라도 타게되면, catch 이후의 모든 이벤트는 중단된다.

### catchErrorJustReturn
```swift
func catchErrorJustReturn(_ element:) -> RxSwift.Observable<Self.E>
```
- 에러를 무시하고 지정된 값으로 반환할 때 사용한다.
- **catchError**와 달리 에러 종류에 대한 구분이 필요 없을 때, 간결하게 표현할 수 있다.

```swift
Observable<Weather> 
  .concat([.error(MyError.requestError1),
           .just(.hot)])
  .catchErrorJustReturn(.cloudy)
  .subscribe( ... )
  .disposed(by: disposeBag)
  
// 출력
// onNext: cloudy
// onCompleted
```
- 어떠한 에러가 발생하는지 확인하지 않고, 무조건 .cloudy를 담은 next 이벤트로 변환한다.
- catchError와 마찬가지로 한번 에러 핸들링을 하면 해당 스트림은 종료(completed)된다.

<br/>
<br/>

## Retry를 이용한 에러 처리

**retry**는 에러 발생 시 즉각 기존 구독을 **dispose**하고 새로운 구독을 생성해서 전체 작업을 반복한다. 비교적 복잡한 에러 처리가 필요할 땐 **retryWhen** 연산자를 사용한다.

### retry
```swift
func retry(_ maxAttemptCount:) -> Observable<E>
```
- retry의 매개변수는 재시도 횟수가 아니라 최대시도 횟수이다.
- retry(2)를 넣으면 에러가 발생할 경우 한 번 재시도하고 한 번 더 에러가 발생하는 순간 error 이벤트를 그대로 전달한다.

```swift
Observable<Weather>
  .concat([.just(.hot),
           .just(.sunny),
           .error(MyError.requestError1),
           .just(.dry)])
  .retry(2)
  .subscribe( ... )
  .disposed(by: disposeBag)
  
// 출력
// onNext: hot
// onNext: sunny
// onNext: hot
// onNext: sunny
// onError: requestError1
// onDisposed
```
- catchError와 retry를 함께 사용한 예제

```swift
Observable<Weather>
  .concat([ApiController.shared.currentWeather_retry_첫번째_에러(),
           .just(.hot)])
  .retry(2)
  .catchError { error -> Observable<Weather> in
    if case MyError.requestError1 = error { 
      return .just(.cloudy)
    }
    return .just(.cold)
  }
  .subscribe( ... )
  .disposed(by: disposeBag)
  
// 출력
// onNext: hot
// onNext: sunny
// onNext: hot
// onDisposed
```
- **ApiController.shared.currentWeather_retry_첫번째_에러()**는 처음 호출시에는 onError를 반환하고 두 번째 호출시에 onNext(.hot), onNext(.sunny)를 차례로 방출하는 함수이다.
- 첫 번째 onError가 발생하면 스트림 전체가 종료되고 retry문의 의해 재시도 된다. **ApiController.shared.currentWeather_retry_첫번째_에러()**를 다시 호출하게 된다.
- **ApiController.shared.currentWeather_retry_첫번째_에러()**는 onNext 이벤트를 방출하고, 정상적으로 .hot과 .sunny가 출력된다.

### retryWhen

```swift
func retryWhen(_ notificationHandler:) -> Observable<E>
```
notificationHandler는 TriggerObservable타입이다. 타입의 이름에서 유추할 수 있듯이 트리거가 되는 옵저버블이 retry를 하는 조건이 된다.<br/>

trigger observable은 **Observable** 또는 **Subject** 모두 될 수 있다. 또한 임의로 retry를 trigger 하는 데 사용된다.

```swift
var maxAttempts = 4
  
  // 
  .retryWhen { e -> Observable<Int> in
    // trigger 역할을 하는 Observable
    return e.enumerated().flatMap { (arg) -> Observable<Int> in
      let (attempt, error) = arg
      let delay = Double(pow(Double(2), Double(attempt)))
      if attempt >= maxAttempts - 1 {
        return Observable.error(error)
      }
      return Observable<Int>
        .timer(delay, scheduler: MainScheduler.instance)
    }
  }
```
- retryWhen의 내부는 **Observable**이다. error를 받아서 Observable<Int>타입을 반환한다. 여기서 Int 자체는 중요하지 않다. onNext(Int)가 되면 retry가 동작하게 된다.
- 인자로 받은 error에 enumerated()를 해주는 이유는 호출된 횟수를 카운트하기 위함이다.
- Double(2)에 attempt(시도횟수)만큼 제곱승을 해서 delay 시간을 주고 onNext 이벤트를 방출한다.
- attempt가 최대시도 횟수를 넘어가게 되면, 그대로 error 이벤트를 던진다.
- 에러가 계속 발생한다는 가정하에 1s, 2s, 4s, 8s 딜레이를 준 뒤에 retry가 된다.

<br/>
<br/>

## Timeout 활용하기

### timeout

```swift
func timeout(_ dueTime: RxTimeInterval, scheduler: SchedulerType) -> Observable<Element>
```
일정 시간 동안 이벤트가 발생하지 않으면 에러를 발생시킨다.

```swift
ApiController.shared.currentWeather_timeout()
  .timeout(2, scheduler: MainScheduler.instance)
  .retry(4)
  .subscribe( ... )
  .disposed(by: disposeBag)
```
- ApiController.shared.currentWeather_timeout() 구독 이후에 어떠한 이벤트도 발생시키지 않는다.
- 2초마다 timeout이 발생하고, 최대 3번까지 재시도를 한다.


<br/>
<br/>

## 스트림을 깨뜨리지 않고 에러 처리하기

Observable chain은 시작 부분에서 에러가 발생했을 때 별도의 관리를 하지 않는 경우 그대로 Subscriber에게 전달한다. Observable이 에러 이벤트를 방출했을 때 에러 구독이 확인되고 이로 인해 모든 구독이 dispose 된다는 뜻이다. **merge, zip, concat**로 여러 Observable을 붙여서 사용하는 경우가 많은데, 하나의 Observable에서 에러가 발생하더라도 무시하고 스트림을 이어가려면 위 연산자들을 붙이기 전에 에러를 핸들링 해줘야만 한다.

```swift
func aRetry(_ e: Observable<Error>) -> Observable<Int> {
  ...
}

func bRetry(_ e: Observable<Error>) -> Observable<Int> {
  ...
}

let aObservable = ApiController.shared.currentWeather()
  .retryWhen(aRetry)
  
let bObservable = ApiController.shared.currentWeather2()
  .catchErrorJustReturn(.cloudy)
  
let cObservable = ApiController.shared.currentWeather3()
  .retryWhen(bRetry)
  
Observable.merge(aObservable, bObservable, cObservable)
  .subscribe( ... )
  .disposed(by: disposeBag)
```
- Observable.merge는 경쟁 operation이다. 선언한 순서에 상관없이 먼저 이벤트가 오면 처리가 된다. 가장 먼저 오는 이벤트가 onError이면 이후 이벤트들은 무시한다.
- 하지만 currentWeather2() 에서 에러가 발생하더라도 catchErrorJustReturn에 의해 에러가 핸들링 되고 onNext가 전달되기 때문에 전체 스트림인 Observable.merge는 중단되지 않고 다른 이벤트들을 기다리게 된다.
