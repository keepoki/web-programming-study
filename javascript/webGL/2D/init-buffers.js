import './type.d.js';

/**
 * @param {WebGL2RenderingContext} gl 
 * @returns {MyWebGLBuffers}
 */
function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
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

  // 꼭지점의 위치 순서는 우측 상단, 좌측 상단, 우측 하단, 좌측 하단
  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

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
  // [r, g, b, a, r, g, b, a, ...]
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, // white, 위치 [1.0, 1.0] 우측 상단
    1.0,
    0.0,
    0.0,
    1.0, // red, 위치 [-1.0, 1.0] 좌측 상단
    0.0,
    1.0,
    0.0,
    1.0, // green, 위치 [1.0, -1.0] 우측 하단
    0.0,
    0.0,
    1.0,
    1.0, // blue, 위치 [-1.0, -1.0] 좌측 하단
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };