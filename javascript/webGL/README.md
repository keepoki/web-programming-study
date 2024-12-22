# WebGL Tutorial

2024-01-16 기준, 한국어 문서의 완성도가 낮아서 영문으로 보는 것을 추천합니다.
<https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial>

튜토리얼에 gl-matrix 2.8.1 라이브러리 gl-matrix-min.js 파일이 포함한다. [glMatrix](https://glmatrix.net/)는 벡터와 매트릭스 연산을 보다 빠르게 수행할 수 있도록 한다.

WebGL에는 내장된 지식이 많지 않다. 단지 사용자가 제공하는 버텍스 셰이더와 프래그먼트 셰이더를 실행하고 원하는 결과를 얻기 위해 창의적인 함수를 작성할 것을 기대할 뿐이다.

2D는 단면의 정사각형으로 구성하고, 위치, 회전, 색상을 설정하고 일정 간격마다 계속 그린다.
3D는 정육면체로 구성하여 회전, {색상, 텍스처, 조명, Animating Textures(Video)}을 설정하고 일정 간격마다 계속 그린다.

조명을 원한다면 직접 계산해야 한다.

> 조명 기술에 대한 설명
<https://en.wikipedia.org/wiki/Phong_shading>
<https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-point.html>

## 실행 방법

module을 사용하는 JS 파일은 그냥 실행시키면 File 프로토콜로 열리므로 CORS 에러가 발생할 수 있다. 따라서 아래 문서를 참고하여 실행한다.

[module 방식의 HTML 파일 실행하기](../../README.md)
