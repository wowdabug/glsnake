import { snake, headX, headY } from "./update.js";
import { createProgramFromPaths } from "./gl-utils.js";
import { gl, canvas } from "./render.js";
import { logOnce } from "./utils.js";

let program;
let vao;

let resolutionUniformLocation;
let offsetBuffer;

export async function init() {
	program = await createProgramFromPaths(gl, "snake.vert", "snake.frag");

	resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

	const positionAttribLocation = 0;
	const offsetAttribLocation = 1;

	const quadBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);

	// 4 vertices because of gl.TRIANGLE_STRIP
	// also note the CCW winding order starting from top-left
	const quadVertices = new Float32Array([
		-0.5, 0.5,
		-0.5, -0.5,
		0.5, -0.5,
		0.5, 0.5
	]);

	gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

	vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

	gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionAttribLocation);

	offsetBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, offsetBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, snake.buffer, gl.DYNAMIC_DRAW);

	gl.vertexAttribPointer(offsetAttribLocation, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(offsetAttribLocation);
	gl.vertexAttribDivisor(offsetAttribLocation, 1);

	gl.useProgram(program);
	gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
}

export function bufferOffsets() {
	gl.bindBuffer(gl.ARRAY_BUFFER, offsetBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, snake.buffer);
}

export function render(needsResize) {
	gl.useProgram(program);
	gl.bindVertexArray(vao);

	if (needsResize) {
		gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
	}

	gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, snake.getSize());
}
