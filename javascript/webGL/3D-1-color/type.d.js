/**
 * @typedef {Object} ShaderProgramInfo
 * @property {WebGLProgram} program
 * @property {attribLocations} attribLocations
 * @property {uniformLocations} uniformLocations 
 */

/**
 * @typedef {Object} attribLocations
 * @property {GLint} vertexPosition
 * @property {GLint} vertexColor
 */

/**
 * @typedef {Object} uniformLocations
 * @property {WebGLUniformLocation} projectionMatrix
 * @property {WebGLUniformLocation} modelViewMatrix
 */

/**
 * @typedef {Object} MyWebGLBuffers
 * @property {WebGLBuffer} position
 * @property {WebGLBuffer} color
 * @property {WebGLBuffer} indices
 */