import { resizeCanvasToDisplaySize } from "./gl-utils.js";
import { init as initFood, render as renderFood } from "./render-food.js";
import { init as initSnake, render as renderSnake } from "./render-snake.js";

export let canvas;
export let gl;

export async function init() {
	canvas = document.getElementById("c");
	if (!canvas) {
		throw new Error("No canvas element with ID \"c\"");
	}

	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw new Error("WebGL2 not supported");
	}

	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	await initFood();
	await initSnake();
}

export function render() {
	const needsResize = resizeCanvasToDisplaySize(canvas);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT);

	renderFood(needsResize);
	renderSnake(needsResize);
}
