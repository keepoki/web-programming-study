import './type.d.js';
import { initBuffers } from './init-buffers.js';
import { drawScene } from './draw-scene.js';

let copyVideo = false;

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
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main() {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
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
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  // 우리가 그릴 개체들에 대한 모든 것을 구축합니다.
  const buffers = initBuffers(gl);
  const texture = initTexture(gl);
  const video = setupVideo('video.mp4');

  // 이미지 픽셀을 WebGL이 예상하는 아래에서 위 순서로 뒤집습니다.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  let cubeRotation = 0.0;
  let deltaTime = 0;
  let then = 0;

  function render(now) {
    now *= 0.001;
    deltaTime = now - then;
    then = now;

    if (copyVideo) {
      updateTexture(gl, texture, video);
    }

    drawScene(gl, programInfo, buffers, texture, cubeRotation);
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

/**
 * @param {WebGL2RenderingContext} gl 
 * @param {string} url 
 * @returns {WebGLTexture}
 */
function initTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 동영상은 인터넷을 통해 다운로드해야 하기 때문에
  // 준비될 때 까지 잠시 시간이 걸릴 수 있습니다.
  // 그때까지 질감에 하나의 픽셀을 넣어 바로 사용할 수 있습니다.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // 불투명한 파란색

  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );
  
  // 영상의 크기에 상관없이 작동하도록 밉맵을 끄고 가장자리에 고정하도록 래핑을 설정합니다.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  return texture;
}

/**
 * @param {string} url 
 * @returns {HTMLVideoElement}
 */
function setupVideo(url) {
  const video = document.createElement('video');

  let playing = false;
  let timeupdate = false;

  video.playsInline = true;
  video.muted = true;
  video.loop = true;

  // 두 이벤트를 기다리는 동안 비디오에 데이터가 있는지 확인
  video.addEventListener(
    'playing',
    () => {
      playing = true;
      checkReady();
    },
    true,
  );

  video.addEventListener(
    'timeupdate',
    () => {
      timeupdate = true;
      checkReady();
    },
    true,
  );

  video.src = url;
  video.play();

  function checkReady() {
    if (playing && timeupdate) {
      copyVideo = true;
    }
  }

  return video;
}


/**
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLTexture} texture 
 * @param {HTMLVideoElement} video 
 */
function updateTexture(gl, texture, video) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    video,
  );
}