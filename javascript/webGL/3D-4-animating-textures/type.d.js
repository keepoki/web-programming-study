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
 * @property {GLint} vertexNormal
 */

/**
 * @typedef {Object} uniformLocations
 * @property {WebGLUniformLocation} projectionMatrix
 * @property {WebGLUniformLocation} modelViewMatrix
 * @property {WebGLUniformLocation} uSampler
 * @property {WebGLUniformLocation} normalMatrix
 */

/**
 * @typedef {Object} MyWebGLBuffers
 * @property {WebGLBuffer} position
 * @property {WebGLBuffer} indices
 * @property {WebGLBuffer} textureCoord
 * @property {WebGLBuffer} normal
 */