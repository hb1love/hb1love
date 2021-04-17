---
title: '[Swift] Closure'
date: 2018-04-12
category: 'swift'
draft: false
---

클로저는 인자값으로 사용되는 객체인 만큼, **생략**과 **추론**을 통해서 간결성을 극대화할 수 있다.

클로저를 인자값으로 가지는 함수이다.

<script src="https://gist.github.com/hb1love/ba57b6774bd40184c8b41f23d15f80ec.js"></script>

이 함수는 정수형 배열을 입력받아서 조건에 만족하는 정수의 합을 반환한다.

이번에는 인자로 전달할 함수와 정수형 배열이다.

<script src="https://gist.github.com/hb1love/98f2be04dabad90a63a9f711d37a85c3.js"></script>

위의 코드들을 활용하여 다음과 같이 사용할 수 있다.

<script src="https://gist.github.com/hb1love/204415ae8c21abca7d7c6810c9dc1e1e.js"></script>

이제 위에서 작성했던 even 함수를 클로저 표현식으로 바꾸면

<script src="https://gist.github.com/hb1love/0799103bd1fa32f44a7e99e94023c8be.js"></script>

위 코드를 스위프트에서 제공하는 추론을 활용해서 클로저 표현식을 간결하게 고칠 수 있다.

우선 클로저 표현식은 **반환값의 타입을 생략**할 수 있다. 컴파일러가 알아서 return 값을 찾고 타입을 정의하기 때문.

<script src="https://gist.github.com/hb1love/783fe5d28fd63514d0a381cd7b4159e4.js"></script>

"-> Bool" 표현을 생략했지만, 컴파일러는 반환값인 value%2==0를 보고 반환 타입이 Bool이라는 것을 알 수 있다.

그리고 매개변수 표현 부분에서 **value의 타입인 Int** 역시 컴파일러가 실제로 대입되는 값을 기반으로 추론할 수 있다.

<script src="https://gist.github.com/hb1love/f72eb65d35590eb76d76006e8edc5af0.js"></script>

지금도 간결하지만, 아직 더 줄일 수 있다. **매개변수마저 생략** 할 수 있다.

그 대신 `$0, $1..` 와 같은 이름으로 할당된 **내부 상수를 이용한다.**

<script src="https://gist.github.com/hb1love/55c4b1ac6ed498bdf08914afd3f9ac9d.js"></script>

이 클로저는 인자값을 순서대로 확인하여 결과값을 반환한다.

  
하지만 어차피 Bool 값을 반환한다는 것을 컴파일러가 알고 있으니까(sum 함수의 인자값 타입을 보고) **return 구문까지 생략할** 수 있다.

<script src="https://gist.github.com/hb1love/3cf0f6955b89a43cddd4d2cf544ff829.js"></script>

생략과 추론을 통해 얻은 최종적인 클로저.

<script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" data-ad-client="ca-pub-6421452554959202"></script>

   
<script type="text/javascript" src="//<a&nbsp;href=">t1.daumcdn.net/kas/static/ba.min.js</a>" async></script>