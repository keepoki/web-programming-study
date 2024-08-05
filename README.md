# 웹 개발에 대한 학습을 기록합니다

## module Type JS 파일을 로드하는 HTML 실행 방법

HTML 파일에서 `<script type="module" src="*.js"></script>`으로 설정되어 있다면 운영체제에서 HTML 파일을 실행 시 동일 출처 정책 (Same Origin Policy)에 위반되어 에러가 발생합니다.
여기서 발생하는 문제는 File 프로토콜으로 실행되기 때문입니다.
모듈 스크립트의 특성상 자바스크립트 모듈 보안 요구사항으로 인해 CORS 오류가 발생합니다.

해결 방법으로 로컬 서버를 구동하여 실행하면 해결 됩니다.

1. VSCode 확장 프로그램: `Live Server`를 설치하고 실행하여 경로만 맞으면 언제든 HTML 파일을 실행할 수 있습니다.
<https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer>
2. NPM 패키지 즉시 실행: `npx http-server`
<https://www.npmjs.com/package/http-server>
