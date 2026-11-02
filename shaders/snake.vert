#version 300 es

uniform vec2 u_resolution;

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_offset;

void main() {
	vec2 position = (a_position + a_offset);
	vec2 clipSpace = ((a_position) * 2.0) - 1.0;
	gl_Position = vec4(clipSpace, 0.0, 0.1);
}
