---
title: '싱글톤 패턴 (Singleton Pattern in Swift)'
date: 2020-01-02
category: 'design pattern'
draft: false
---

![](./images/singleton-pattern-1.png)

# 싱글톤 패턴

싱글톤 패턴은 애플리케이션의 생애주기 동안 하나의 인스턴스만 허용하는 경우에 사용합니다.

애플리케이션에서 특정 동작을 수행하기 위해 하나의 인스턴스만 사용할 때 유용합니다. 만약 애플리케이션이 데이터베이스에 접근할 때 하나의 연결만 갖도록 한다면? 싱글톤 사용의 좋은 예가 될 수 있습니다. 하지만 전역적인 사용으로 인해 외부에 강한 의존을 갖게 될 수도 있습니다.

잘 사용하면 깔끔한 해결책이 되지만 오용하게 될 경우 잘못된 설계의 원흉이 될 수도 있습니다.

## 예제 코드

```swift
class Application {
    static let shared = Application()

    private init() {}
}
```

Application의 클래스 상수로 shared라는 Application 인스턴스를 생성하고 오직 하나의 인스턴스만 생성되는 것을 보장하기 위해 생성자를 private으로 제한합니다.

## 싱글톤의 쓰레드

Swift 3.0부터는 싱글톤의 Thread-Safety에 대해서 개발 중에 신경 쓸 필요가 없어졌습니다. 자세한 내용은 아래 링크

[https://swift.org/migration-guide-swift3/](https://swift.org/migration-guide-swift3/)

dispatch\_once가 'static let'만으로 충분히 대체가 가능해졌습니다.
