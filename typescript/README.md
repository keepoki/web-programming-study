# Typescript

여러가지 기능과 개념을 타입스크립트로 알아봅시다!

## VSCode Code Runner

VSCode에서 `Code Runner` 확장으로 Typescript 파일을 실행하기 위해서는 ts-node 패키지를 전역에 설치해야 합니다.

`npm i -g ts-node`
또한 다음과 같은 에러 발생시
`npm ERR! enoent ENOENT: no such file or directory, lstat 'C:\Users\user\AppData\Roaming\npm'`
해당 경로 (C:\Users\user\AppData\Roaming)에 npm 폴더를 생성해주면 됩니다.