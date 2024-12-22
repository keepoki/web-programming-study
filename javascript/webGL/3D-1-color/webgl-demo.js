import './type.d.js';
import { initBuffers } from './init-buffers.js';
import { drawScene } from './draw-scene.js';

window.addEventListener('load', () => {
  main();
});

function main() {
  /** @type {HTMLCanvasElement | null} */
  const canvas = document.getElementById('glcanvas');
  /** @type {WebGL2RenderingContext | null} */
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl)  {
    console.error('WebGL 초기화 실패, 브라우저 또는 컴퓨터에서 지원하지 않을 수 있습니다.') 
    return;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  // 검정, 불투명으로 설정
  gl.clearColor(0.0, 0.0, 0.0, 1.0); 
  // 색상과 깊이 버퍼를 지움
  gl.clear(gl.COLOR_BUFFER_BIT); 

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  const fsSource = `
    varying lowp vec4 vColor;

    void main() {
      gl_FragColor = vColor;
    }
  `

  // 쉐이더 프로그램을 초기화, 꼭짓점 등을 설정하고 여기서 모든 조명이 켜집니다.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  /**
   * @type {ShaderProgramInfo}
   * 쉐이더 프로그램을 사용하는 데 필요한 모든 정보를 수집합니다
   */
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // 우리가 그릴 개체들에 대한 모든 것을 구축합니다.
  const buffers = initBuffers(gl);

  let cubeRotation = 0.0;
  let deltaTime = 0;
  let then = 0;

  function render(now) {
    now *= 0.001;
    deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, cubeRotation);
    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/**
 * 쉐이더 프로그램을 초기화하여 WebGL이 데이터를 그리는 방법을 알 수 있도록 합니다
 * @param {WebGL2RenderingContext} gl 
 * @param {string} vsSource 
 * @param {string} fsSource
 * @returns {WebGLProgram | null}
 */
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // 쉐이더 프로그램 생성
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // 쉐이더 프로그램 초기화 성공 유무 확인
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(`쉐이더 프로그램 초기화 실패: ${gl.getProgramInfoLog(shaderProgram)}`);
    return null;
  }

  return shaderProgram;
}

/**
 * 지정된 유형의 쉐이더를 만들고 소스를 업로드하고 컴파일 합니다
 * @param {WebGL2RenderingContext} gl 
 * @param {GLenum} type 
 * @param {string} source
 * @returns {WebGLShader | null}
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // 쉐이더 객체에 소스를 보냄
  gl.shaderSource(shader, source);

  // 쉐이더 프로그램을 컴파일
  gl.compileShader(shader);

  // 컴파일 성공 유무 확인
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`쉐이더 컴파일 에러: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
