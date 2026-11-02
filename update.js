import { seedRandom, getRandomInt } from "./random.js";
import { RingBuffer } from "./ring-buffer.js";
import { codes } from "./input.js";
import { logOnce } from "./utils.js";

const emptyBit = 0;
const snakeBit = 1;

const gridSizeX = 16;
const gridSizeY = 16;
export const gridSize = gridSizeX * gridSizeY;

export const snake = new RingBuffer(gridSize * 2);
const grid = new Uint8Array(gridSize);

export let headX = 0;
export let headY = 0;
export let foodX;
export let foodY;

let movementX = 1;
let movementY = 0;

function randomizeFood() {
	let randomPosition;

	do { // try to find empty position in grid
		randomPosition = getRandomInt(gridSize);
	} while (grid[randomPosition] !== emptyBit);

	foodX = randomPosition % gridSizeX;
	foodY = Math.floor(randomPosition / gridSizeX);
}

export function init() {
	seedRandom();
	randomizeFood();
	pushSnake();
}

export function update(deltaTime) {
	if (codes.KeyW) {
		if (movementY === 0) {
			movementX = 0;
			movementY = -1;
		}
	}

	if (codes.KeyA) {
		if (movementX === 0) {
			movementX = -1;
			movementY = 0;
		}
	}

	if (codes.KeyS) {
		if (movementY === 0) {
			movementX = 0;
			movementY = 1;
		}
	}

	if (codes.KeyD) {
		if (movementX === 0) {
			movementX = 1;
			movementY = 0;
		}
	}
}

function index(x, y) {
	return (y * gridSizeX) + x;
}

function pushSnake() {
	snake.push(headX, headY);             // update ring buffer
	grid[index(headX, headY)] = snakeBit; // update grid buffer
}

function shiftSnake() {
	const [tailX, tailY] = snake.shift(); // update ring buffer
	grid[index(tailX, tailY)] = emptyBit; // update grid buffer
}

function win() {
	throw new Error("todo");
}

function lose() {
	throw new Error("todo");
}

export function tick() {
	logOnce("aaaa", snake.buffer)
	console.log(snake.getSize());

// 	const invalidMovement =
// 		(movementX !== 0 && movementY !== 0) ||
// 		(movementX < -1 || movementX > 1) ||
// 		(movementY < -1 || movementY > 1);
//
// 	if (invalidMovement) {
// 		throw new Error("Invalid direction");
// 	}

	headX += movementX;
	headY += movementY;

	const foodCollision =
		(headX === foodX) &&
		(headY === foodY);

	if (foodCollision) {
		randomizeFood();
	} else {
		shiftSnake();
	}

	const boundsCollision =
		(headX < 0 || headX >= gridSizeX) ||
		(headY < 0 || headY >= gridSizeY) ||
		(grid[index(headX, headY)] === snakeBit);

	if (boundsCollision) {
		lose();
	}

	pushSnake();

	if (snake.getSize() >= gridSize) {
		win();
	}

	logOnce("aaa", snake.buffer)
}
