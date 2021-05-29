---
title: '[iOS] Timer memory leak issue'
date: 2019-08-15
category: 'ios'
draft: false
---

개발하다보면 Timer를 자주 사용하게 된다. 별생각 없이 사용하다가 타이머 때문에 **메모리 릭**이 발생하는 걸 뒤늦게 발견했다.

**iOS 11 아래** 버전에서 반복 옵션(**repeat**)을 사용하게 되면 Timer 내부에서 target에 대한 참조를 계속 갖고 있어서 생기는 문제이다. 이 문제를 해결하기 위한 방법을 생각해 보았다.


## Problem case

일정 시간 간격으로 롤링이 되는 UIScrollView를 만드는 요구사항이 있었다. 아래처럼 Timer를 사용했었다.

```swift
class MyView: UIView {
  var scrollView: UIScrollView!
  var timer: Timer?

  func startAutoScroll() {
    timer = Timer.scheduledTimer(
      timeInterval: 10,
      target: self,
      selector: #selector(scrollToNextPage),
      userInfo: nil,
      repeats: true
    )
  }

  func scrollToNextPage() {
    ...
  }
}
```

그리고 deinit 시점에 타이머의 invalidate()를 호출해주었다.

```swift
  deinit {
    timer?.invalidate()
    timer = nil
  }
```

명확하고 문제없어 보이지만, Timer는 타겟인 MyView를 강한 참조로 가지고 있다. 이 말은 MyView와 Timer가 서로에 강한 참조를 갖고 있어서 한쪽에서 명시적으로 참조를 끊지 않는 이상 deinit이 호출되지 않는단 것이다.

[Apple's documentation](https://developer.apple.com/documentation/foundation/timer#//apple_ref/occ/instm/NSTimer/invalidate?utm_source=swifting.io)에는 타이머의 참조를 없애기 위해 반드시 invalidate()를 호출하라고 명시되어있다.


## Solution

다른 뷰나 객체에서 명시적으로 timer의 invalidate를 호출할 수도 있겠지만, timer를 사용하는 곳 마다 신경쓸 것이 많아지니 효율적인 해결책은 아닌 듯 하다. Timer의 target 객체에 대한 의존성만 약한 참조로 변경해주면 해결될 문제이니 **Timer Wrapper**를 두어서 우회적으로 해결한다.

```swift
final class WeakTimer {
  private weak var timer: Timer?
  private weak var target: AnyObject?
  private let action: (Timer) -> Void

  private init(
    timeInterval: TimeInterval,
    target: AnyObject,
    repeats: Bool,
    action: @escaping (Timer) -> Void
  ) {
    self.target = target
    self.action = action
    self.timer = Timer.scheduledTimer(
      timeInterval: timeInterval,
      target: self,
      selector: #selector(fire),
      userInfo: nil,
      repeats: repeats
    )
  }

  class func scheduledTimer(
    timeInterval: TimeInterval,
    target: AnyObject,
    repeats: Bool,
    action: @escaping (Timer) -> Void
  ) -> Timer {
    return WeakTimer(
      timeInterval: timeInterval,
      target: target,
      repeats: repeats,
      action: action
    ).timer!
  }

  @objc private func fire(timer: Timer) {
    if target == nil {
      timer.invalidate()
    } else {
      action(timer)
    }
  }
}
```

MyView는 Timer에 대한 참조를 유지하면서 Timer의 참조는 WeakTimer로 바꾸었다. 지정한 시간마다 fire()가 호출되고, target이 release 되었는지를 체크해서 timer의 invalidate를 호출하는 구조이다.

MyView에 대한 **retain count**가 증가하지 않기 때문에 이전의 문제가 발생하지 않는다.

그리고 Timer를 사용하는 곳에서는 아래처럼 코드를 변경한다.
```swift
  func startAutoScroll() {
    timer = WeakTimer.scheduledTimer(
      timeInterval: TimeInterval(scrollInterval),
      target: self,
      repeats: true
    ) { [weak self] _ in
      self?.scrollToNextPage()
    }
  }
```
