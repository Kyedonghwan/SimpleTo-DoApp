# node-sass를 넘어선 dart-sass 실프로젝트 적용기


## dart-sass와 node-sass 등장 배경
sass는 웹 브라우저가 인식할 수 있는 css 언어로 변경해 주는 css 전처리기 스타일 시트 언어입니다. sass를 사용하여 컴파일하면 css에는 존재하지 않는 중첩문, 반복문, 변수 등을 사용한 효율적인 웹 스타일링이 가능합니다. 최초의 공식 sass는 ruby라는 언어로 만들어진 ruby-sass입니다. 하지만 ruby-sass는 다양한 언어환경에 호환되기 쉽지 않았고, 이 문제 해결을 위해 c/c++ 언어로 구성된 LibSass가 나오게 되었고 이는 현재 대중적인 node.js 환경에서 사용가능한 node-sass로 발전하여 제일 많이 사용되었습니다. 반면, ruby-sass는 새로운 dart라는 언어로 개발된 dart-sass에 밀려 dart-sass가 현재 sass의 공식참조표현이 되었습니다. dart는 ruby에 비해 속도, 의존성면에서 뛰어났고, 고급언어여서 메모리관리및 빌드 시스템에서 유리했습니다. 또한 ruby에 비해 배우기 쉬운 언어이므로 dart-sass가 발전속도도 빠를 수 밖에 없었습니다. 이러한 장점을 가진 dart-sass는 node-sass와 함께 현재 다양한 프로젝트에서 많이 쓰이고 있습니다.


## 모든 면에서 우위인 dart-sass
node-sass는 dart-sass에 비해 모든 면에서 우위입니다. node js 언어는 사용량이 많은 만큼 급속도로 버전이 업데이트 되었으며, 이에 맞춰 node-sass 버전도 수정되어야 했습니다. 업무 내 서비스 저장소 생성시기에 따라 사용 node js 버전이 다를 수 밖에 없고, 저장소 별로 버전 호환을 맞춰야 하는 귀찮은 문제가 생기기 시작했습니다. 하지만 dart-sass는 node js 처럼 버전에 의존적이지 않아 매 저장소 마다 버전 변경을 해주지 않아도 됩니다. 

또한, sass 공식 사이트는 ruby를 버리고 dart를 선택한 이후 최신 문법을 dart-sass에 적용하기 시작했습니다. 따라서 dart-sass를 사용하면 새로 추가되는 문법을 사용 가능합니다. 이에 비해 node-sass는 공식 참조 표현이 아니기 때문에 새로운 문법 사용자체가 불가능합니다. 다음 사진은 [sass 공식 홈페이지](https://sass-lang.com/documentation/values/lists/)에서 dart-sass 최신버전 1.77.8 기준으로 다른 언어의 sass들에 대한 호환성 여부를 제공하고 있는 웹사이트 화면입니다.


![sass 공식홈페이지 버전 호환성 비교](https://media.oss.navercorp.com/user/28285/files/5221f250-2ed8-44bf-9bb4-f72548cab156)


위에서 알 수 있듯이 'List'라는 sass 최신 문법에 대해 dart-sass는 모든 버전에서 사용가능하고, LibSass(node-sass)와 ruby-sass는 일부 버전(3.5.0) 이후로 사용 가능함을 알 수 있습니다. sass 공식 사이트에 접속하면, 다양한 최신 문법에 대해 dart-sass는 모든 버전에서 사용가능하고, LibSass(node-sass)는 일부 버전 이후 혹은 아예 사용이 불가능함을 알 수 있습니다. 앞으로 최신 문법이 계속 추가된다면, 업데이트 되지않는 LibSass는 버전 호환성에 대한 정보 제공 자체가 의미없을 뿐더러 사용량이 점차 감소하여 나중엔 사라질 수 있다고 합니다.

node-sass는 이러한 장점들로 힘입어 2021년 중순부터 공식 모듈 다운로드 사이트인 npm의 다운로드 수에서 node-sass를 넘어서고 있습니다. 다만 속도면에서 같은 npm 환경이라는 가정하에 측정해보았을 때 node-sass가 dart-sass보다 빠른 점이 확인되었습니다. 하지만 이 차이는 버전 호환성, 새로운 문법 도입, 향후 node-sass가 사라질 수 있는 점 등을 종합적으로 감안해보았을 때 이를 감안하고 사용할 만한 눈에 띄게 큰 차이는 아닙니다.


## 최신 dart-sass 문법

dart-sass 최신버전(1.77.8) 기준으로 node-sass는 제공하지 않는 몇가지 유용한 문법을 소개하겠습니다. 

### @use
`@import` 는 전역으로 특정 변수나 mixin, 다른 sass파일을 불러올 때 쓰입니다. 자칫 길어질 수 있는 sass파일을 특성에 맞게 여러 파일로 분류하여 효율적인 작업이 가능하게 도와줍니다. 하지만, sass 공식팀에서는 `@use`라는 새로운 문법을 도입하며 이 `@import` 사용에 대해 지양하기를 권고하고 있습니다. 

![@use 사용 권장](https://media.oss.navercorp.com/user/28285/files/d27fad02-d94d-45c3-9e29-8502ba800de7)

sass 공식팀은 이 `@import` 대신 `@use` 문법 사용 권장 이유에 대하여 다음과 같이 설명하고 있습니다.
- 변수, mixin, 함수 등이 전역에서 사용되어 구조가 복잡할 경우 어느 파일에서 정의되었는지 찾기 힘듭니다.
- 변수, mixin, 함수의 이름이 전역으로 사용되어 네이밍에 어려움이 있을 수 있습니다.
- 사용되지 않는 전역 sass 스타일이 추가되기 쉬워 컴파일 속도가 느려질 수 있습니다.

이러한 단점은 dart-sass에서만 도입되는 `@use`라는 내장 모듈 문법으로 해결 가능하며 sass 공식팀은 몇년 안에 `@import` 문법을 아예 제거할 수 있다고 말했습니다. 다음은 `@import`와 `@use` 차이를 설명한 예시입니다.

````
// a.scss
$radius: 3px;

// b.scss
$radius: 5px;

// style.scss
@import "src/a";
@import "src/b";

.button {
  border-radius: $radius;
}
````

`@import` 구문을 사용한다면, button의 radius는 b.scss의 전역 변수 $radius값으로 덮어씌어 5px 값을 가지게 됩니다. 의도한 값이 적용되지도 않으며 코드를 읽고 수정하는 사람에게는 가독성이 떨어지고 코드량이 증가하면 유지 보수가 매우 어려울 것입니다.

````
// a.scss
$radius: 3px;

// b.scss
$radius: 5px;

// style.scss
@use "src/a" as first;
@use "src/b" as second;

.button {
  border-radius: first.$radius;
}
````

`@use` 구문을 사용하여 namepsace를 지정해 모듈화하면 다음과 같이 다른 변수로 분리하여 사용 가능합니다. 앞선 예시처럼 radius 값이 덮어씌지 않고 a.scss의 radius 값이 3px로 적용될 수 있는 건 `@use`를 사용하여 정확한 namespace인 'first'를 지정해 주었기 때문입니다.


###  내장함수 sass:
내장함수는 
내장함수의 대표적인 예로 `@use 'sass:math'`, `@use 'sass:string'` 가 있습니다. dart sass는 @use 뒤에 `sass:`라는 표현으로 내장함수임을       나타냅니다. 내장함수가 새로 생기고 나서부터 기존 sass 문법에서는 `width: calc( 300px/2 );` 오류가 나지않았지만, 최신 dart sass에서는 경고가 뜨며 최신 내장함수 math.div를 사용하라고 권장합니다.

```
Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.
Recommendation: math.div( 300px, 2)
```

이와 같은 다양한 기능을 가진 dart sass를 바로 도입하면 좋지만 현실은 이미 많은 양의 소스가 이전 문법 코드로 작성되어 있어 바꾸기 쉽지 않습니다.
하지만 sass 공식 홈페이지에서 소개하는 `sass-migrator` 가 자동으로 최신 dart sass 문법으로 수정해 줍니다. 이 `sass-migrator`는 dart sass로 이전하는 많은 프로젝트에 수고를 덜어줄 것입니다.

참고: https://github.com/sass/dart-sass




