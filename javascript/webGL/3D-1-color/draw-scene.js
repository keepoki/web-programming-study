import './type.d.js';

/**
 * @param {WebGL2RenderingContext} gl 
 * @param {ShaderProgramInfo} programInfo
 * @param {MyWebGLBuffers} buffers 
 * @param {Number} cubeRotation 
 */
function drawScene(gl, programInfo, buffers, cubeRotation) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 원급법 행렬을 만듭니다. 카메라에서 원근의 왜곡을 시뮬레이션 하는데 사용합니다.
  // 시야는 45도, 너비/높이는 캔버스 표시 크기와 일치하는 비율로 설정합니다.
  // 그리고 0.1 단위 사이의 물체만 보여줍니다. 카메라에서 100 units 떨어져있습니다.

  const fieldOfView = (45 * Math.PI) / 180; // 시야 범위, radian
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // 참고: glmatrix.js에서는 결과를 수신할 목적으로 항상 첫 번째 인수가 있습니다.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // 도면 위치를 장면의 중간에 설정
  const modelViewMatrix = mat4.create();

  // 도면 위치를 우리가 원하는 곳으로 이동
  mat4.translate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [0.0, 0.0, -6.0], // [x, y, z], OpenGL은 오른손 좌표계로 z 값이 작을 수록 화면에서 멀어짐
  );

  // 도면 회전 값을 설정
  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    cubeRotation,
    [0, 0, 1],
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    cubeRotation * 0.7,
    [0, 1, 0],
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    cubeRotation * 0.3,
    [1, 0, 0],
  );

  // 위치 버퍼에서 위치를 정점 위치 속성으로 끌어내는 방법을 WebGL에 알려줍니다.
  setPositionAttribute(gl, buffers, programInfo);
  // 색상 버퍼에서 vertexColor 속성으로 색상을 꺼내는 방법을 WebGL에게 알려줍니다.
  setColorAttribute(gl, buffers, programInfo);

  // WebGL에 정점 인덱싱에 사용할 인덱스를 알려줍니다.
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // WebGL에게 사용자 정의 프로그램을 사용할 것을 지시합니다.
  gl.useProgram(programInfo.program);

  // 쉐이더 유니폼 설정
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

  const offset = 0;
  const vertexCount = 36;
  const type = gl.UNSIGNED_SHORT;
  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  // gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
}

/**
 * 위치 버퍼에서 위치를 정점 위치 속성으로 끌어내는 방법을 WebGL에 알려줍니다.
 * @param {WebGL2RenderingContext} gl 
 * @param {MyWebGLBuffers} buffers 
 * @param {ShaderProgramInfo} programInfo 
 */
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 3; // 반복 마다 2개의 값을 뽑음
  const type = gl.FLOAT;
  const normalize = false;
  // 한 집합에서 다음 집합의 값으로 가져올 바이트 수
  // 0은 use type 그리고 위의 numComponents 설정 값으로 한다.
  const stride = 0; 
  const offset = 0; // 버퍼 내부에서 시작할 바이트 수

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset,
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

/**
 * 색상 버퍼에서 vertexColor 속성으로 색상을 꺼내는 방법을 WebGL에게 알려줍니다.
 * @param {WebGL2RenderingContext} gl 
 * @param {MyWebGLBuffers} buffers 
 * @param {ShaderProgramInfo} programInfo 
 */
function setColorAttribute(gl, buffers, programInfo) {
  const numComponents = 4; // initColorBuffer 설정에 colors를 보면 색상이 4가지 이므로 4로 설정한다.
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset,
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };