import './type.d.js';

/**
 * @param {WebGL2RenderingContext} gl 
 * @returns {MyWebGLBuffers}
 */
function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const indexBuffer = initIndexBuffer(gl);
  const textureCoordBuffer = initTextureBuffer(gl);

  return {
    position: positionBuffer,
    indices: indexBuffer,
    textureCoord: textureCoordBuffer,
  };
}

/**
 * @param {WebGL2RenderingContext} gl 
 * @returns {WebGLBuffer}
 */
function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer();

  // 위치 버퍼 적용
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 꼭지점의 위치
  const positions = [
    // 앞면
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

    // 뒷면
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

    // 윗면
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

    // 아랫면
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

    // 우측면
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

    // 좌측면
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
  ];

  // WebGL에 위치 목록을 전달합니다
  // 자바스크립트 배열을 사용하여 현재 버퍼를 채웁니다
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

/**
 * @param {WebGL2RenderingContext} gl 
 * @returns {WebGLBuffer}
 */
function initColorBuffer(gl) {
  const faceColors = [
    [1.0, 1.0, 1.0, 1.0], // 앞면: white
    [1.0, 0.0, 0.0, 1.0], // 뒷면: red
    [0.0, 1.0, 0.0, 1.0], // 윗면: green
    [0.0, 0.0, 1.0, 1.0], // 아랫면: blue
    [1.0, 1.0, 0.0, 1.0], // 우측면: yellow
    [1.0, 0.0, 1.0, 1.0], // 좌측면: purple
  ];

  // 색상 배열을 모든 정점에 대한 표로 변환합니다.
  let colors = []; 
  for (const c of faceColors) {
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

/**
 * @param {WebGL2RenderingContext} gl 
 * @returns {WebGLBuffer}
 */
function initIndexBuffer(gl) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // 이 배열은 각 면을 두개의 삼각형으로 정의하며, 각 삼각형의
  // 위치를 지정하기 위해 정점 배열에 인덱스를 사용합니다.
  const indices = [
    0,
    1,
    2,
    0,
    2,
    3, // 앞
    4,
    5,
    6,
    4,
    6,
    7, // 뒤
    8,
    9,
    10,
    8,
    10,
    11, // 위
    12,
    13,
    14,
    12,
    14,
    15, // 아래
    16,
    17,
    18,
    16,
    18,
    19, // 우
    20,
    21,
    22,
    20,
    22,
    23, // 좌
  ];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );

  return indexBuffer;
}

/**
 * @param {WebGL2RenderingContext} gl
 * @returns {WebGLBuffer}
 */
function initTextureBuffer(gl) {
  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  // 각 면의 각 버텍스에 해당하는 텍스처 좌표를 정의 합니다. 0.0 ~ 1.0
  const textureCoordinates = [
    // Front
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Back
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Top
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Left
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
  ];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoordinates),
    gl.STATIC_DRAW,
  );

  return textureCoordBuffer;
}

export { initBuffers };