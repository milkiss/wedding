# wedding-page
Wedding page for @kaifer

## How to run

### Production mode

```bash
$ npm i yarn -g
$ yarn install
$ yarn build
$ cd build
$ python3 -m http.server 5000
```

and visit `http://localhost:5000`

배포시에는 build 폴더의 결과물에 icon 폴더에 있는 아이콘들을 복사해서 넣어준 다음에 배포합니다.

### With watch

```bash
$ npm i yarn -g
$ yarn install
$ yarn start
```

and open another terminal and run:

```bash
$ cd build
$ python3 -m http.server 5000
```

and visit `http://localhost:5000`

## Log

### 05/17/17
자비없는 클라이언트 @kaifer 님은 Vanilla JS로 개발할 것을 명하시었다. `document.getElementById(...)`... 이걸 몇 년만에 쳐보는지 모르겠다.
사실 아직도 모른다. DOM handler만 쓰기 위해 jQuery를 쓰는 것이 나쁘다고 생각해본 적은 없다. ~~과분한 걸 이상하게 막 갖다 붙여서 그렇지~~

여하튼, 그렇게 이 프로젝트의 기술 스택이 이렇게 정해지고 말았다.

* ES2015+
* babel
* webpack

보일러플레이트, 그런 게 없다. 웹팩부터 한땀한땀 설정해야 한다. damn...
