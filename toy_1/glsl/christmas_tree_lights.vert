#version 450

uniform mat4 qt_Matrix;
in vec4 qt_Vertex;
out vec4 fragCoord;

void main() {
    fragCoord = qt_Vertex;
    gl_Position = qt_Matrix * qt_Vertex;
}
