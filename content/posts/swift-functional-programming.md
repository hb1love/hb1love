---
title: 'Swift와 함수형 프로그래밍'
date: 2019-11-22
category: 'swift'
draft: false
---

우린 함수형 프로그래밍 언어를 말할 때 스위프트를 꼽지 않습니다.  
하스켈, 스칼라, 클로져 등 많은 함수형 프로그래밍 언어가 있지만 적어도 스위프트는 완전한 함수형 프로그래밍 언어는 아닙니다. 

## 그럼에도 함수형

완전한 함수형 프로그래밍 언어는 아니지만, 그래도 함수는 스위프트에서 아주 중요한 역할을 합니다. 클로저를 비동기 콜백(대표적으로 API)으로 전달하거나,  컬렉션의 map, filter, reduce 같은 함수형 패턴들이 곳곳에서 사용됩니다.  
특히나 Swift 5.2에서 **callAsFunction**이 추가되면서 타입과 함수의 경계가 거의 없어졌습니다.

## 불변성

함수형 프로그래밍에서 모든 데이터는 **불변**을 지향합니다. 변경 가능한 상태를 최대한 제거하고 **순수 함수**로 만듭니다.

순수하다는 건 아무것도 모른다는 뜻이겠죠, 함수 외부의 어떤 것도 알지 못하고(영향을 주지 않고) 같은 입력에는 항상 같은 출력을 보장하는 것이 순수 함수입니다. 흔히 **Side effects**가 없다고 표현합니다.

```swift
func calculateScore(shop: Shop, style: Style) -> Int {
    if shop.style == style {
        return shop.score * 2
    }
    return shop.score
}
```

쇼핑몰과 원하는 옷 스타일을 입력으로 받아서 쇼핑몰의 점수를 계산하는 순수 함수입니다.

데이터를 변화시키지 않고, 동일한 입력엔 정확하게 동일한 출력이 나올 것입니다.

```swift
func calculateScore(shop: Shop, style: Style) -> Int {
    if shop.style == style {
        shop.score *= 2
    }
    return shop.score
}
```

이건 어떤가요? 이전의 함수처럼 동일한 입력에 동일한 출력이 나옵니다.

**shop.score \*= 2** 하지만 이 코드는 입력 데이터의 값을 변화시킵니다. 이 또한 Side effects에 해당합니다.  
스위프트에서 이런 일을 미연에 방지하는 방법은 Struct 타입을 사용하는 것입니다.

```swift
struct Shop {
    let score: Int
    let name: String
    let style: Style
}

func calculateScore(shop: Shop, style: Style) -> Int {
    if shop.style == style {
        shop.score *= 2 // Error! Left side of mutating operator isn't mutable
    }
    return shop.score
}
```

값 타입인 Struct는 인자로 전달 시 원래 인스턴스의 복사본이 전달됩니다. 원래 데이터의 값이 변경될 위험이 없어지죠.

> 모든 타입을 Struct로 정의하는 건 인자로 전달할 때 모두 복사가 발생해서 성능상에 문제가 될 것 같지만 실제로 그렇진 않습니다. 스위프트의 컬렉션 타입은 기본적으로 [CoW(Copy-on-Write)](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst#advice-use-copy-on-write-semantics-for-large-values)를 구현하고 있습니다. 커스텀 타입을 정의하는 경우에도 간단하게 [CoW를 구현하는 방법](https://github.com/apple/swift/blob/master/docs/OptimizationTips.rst#advice-use-copy-on-write-semantics-for-large-values)이 있습니다.

## 일급

스위프트에서 함수(Function)는 일급 객체입니다. 일급 객체로써 함수란**변수에 할당할 수도 있고 함수를 파라미터로 전달하거나 반환할 수 있는 것**을 말합니다.

```swift
typealias Operator = (Int, Int) -> Int

var adder: Operator = { $0 + $1 }

func calculator(op: @escaping Operator) -> (Int...) -> Int {
    return { (s: Int...) -> Int in
        s.reduce(0, op)
    }
}

print(calculator(op: adder)(10, 4, 3, 2)) // print 19
```

일급 객체의 특성을 보여주는 예제입니다. 

일급 객체로써의 함수는 고차 함수의 표현이 가능하게 만듭니다. **고차 함수**는 **전달된 인자를 받아서 만든 새로운 함수**를 말합니다. 

## 합성 함수

합성 함수는 둘 이상의 함수를 합쳐서 새로운 하나의 함수를 만드는 것을 말합니다.

함수형은 작은 함수들의 집합으로 구성되기 때문에 여러 함수들을 연쇄적 혹은 병렬로 호출하여 큰 함수를 만듭니다. 

```swift
var addTwo: (Int) -> Int = { $0 + 2 }
var abs: (Int) -> Int = { $0 > 0 ? $0 : -$0 }
var double: (Int) -> Int = { $0 * 2 }

func compose(_ fns: ((Int) -> Int)...) -> (Int) -> Int {
    return { initial in
        fns.reduce(initial) { prevValue, nextFn in
            nextFn(prevValue)
        }
    }
}

let compute = compose(addTwo, abs, double)
compute(-5)
```

## 객체 지향적으로 접근하기

스위프트는 함수형 패러다임을 지원하지만 이미 많은 프레임워크는 객체 지향 방식을 따르고, 우리 또한 객체지향에 익숙해서 새로이 적응하는 게 쉽진 않습니다. 절차 지향에서 객체지향으로 넘어가는 게 어려웠듯이 말이죠

한 가지 접근법으로 기존의 패러다임을 어느 정도 따르면서 함수형을 접목시키는 방식입니다. 함수를 새로운 타입으로 정의하고 타입을 그대로 호출할 것입니다.

```swift
struct Function<Input, Output> {
    let dispatch: (Input) -> Output

    init(_ dispatch: @escaping (Input) -> Output) {
        self.dispatch = dispatch
    }

    func callAsFunction(_ input: Input) -> Output {
        dispatch(input)
    }
}
```

타입인 동시에 그대로 호출 가능한 Function입니다.

> callAsFunction은 Swift 5.2에서 [새롭게 추가된 기능](https://ksther.com/entry/swift-5-2) 중 하나입니다. 타입을 함수처럼 그대로 호출할 수 있습니다. 

## 메서드 체이닝

이제 합성 함수를 표현하기 위해 메서드 체이닝 방식을 사용합니다. Function 타입에 chained 메서드를 추가합니다.

```swift
extension Function {
    func chained<T>(to next: @escaping (Output) -> T) -> Function<Input, T> {
        Function<Input, T> { next(self.dispatch($0)) }
    }
}
```

가장 맨 처음 Shop 예제를 좀 더 확장해봅시다.

Shop 리스트를 받아서 필터, 정렬, 변환하는 작업입니다. 여기서 중요한 건 **불변**, **순수 함수**의 특성을 만족해야 합니다.

```swift
func loadShop(style: Style) -> ([Shop], Style) {
    (API.getShops(), style)
}

func filterAtStyle(shops: [Shop], style: Style) -> [Shop] {
    shops.filter { $0.style == style }
}

func sortByScore(shops: [Shop]) -> [Shop] {
    shops.sorted { $0.score > $1.score }
}

func transformWithRank(shops: [Shop]) -> [(Int, Shop)] {
    shops
        .enumerated()
        .map { ($0 + 1, $1) }
}

func transformForViewModel(rankedShops: [(Int, Shop)]) -> [ShopCellItem] {
    rankedShops
        .map(ShopCellItem.init)
        .compactMap { $0 }
}
```

모두 순수 함수들입니다. 이제 이것들을 조합해서 새로운 함수를 만듭니다.

```swift

...

let shops = Function(loadShop)
    .chained(to: filterAtStyle)
    .chained(to: sortByScore)
    .chained(to: transformWithRank)
    .chained(to: transformForViewModel)

shops(.빈티지)
```

앱을 만들다 보면 완전한 무상태로 만들 수는 없습니다. 반드시 상태를 가져야 하는 상황이 있습니다. 그런 경우를 제외하면 함수형은 동작의 완성도를 높일 뿐 아니라 테스트가 용이하고, 가독성을 함께 높일 수 있는 장점이 있습니다.
