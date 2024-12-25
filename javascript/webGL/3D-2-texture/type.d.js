/**
 * @typedef {Object} ShaderProgramInfo
 * @property {WebGLProgram} program
 * @property {attribLocations} attribLocations
 * @property {uniformLocations} uniformLocations 
 */

/**
 * @typedef {Object} attribLocations
 * @property {GLint} vertexPosition
 * @property {GLint} textureCoord
 */

/**
 * @typedef {Object} uniformLocations
 * @property {WebGLUniformLocation} projectionMatrix
 * @property {WebGLUniformLocation} modelViewMatrix
 * @property {WebGLUniformLocation} uSampler
 */

/**
 * @typedef {Object} MyWebGLBuffers
 * @property {WebGLBuffer} position
 * @property {WebGLBuffer} indices
 * @property {WebGLBuffer} textureCoord
 */