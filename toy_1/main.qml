import QtQuick 2.15
import QtQuick.Window 2.15

Window {
    id: root
    width: 1280
    height: 900
    visible: true
    title: qsTr("Christmas tree lights")

    ShaderEffect {
        anchors.fill: parent
        vertexShader: "file:./glsl/christmas_tree_lights.vert"
        fragmentShader: "file:./glsl/christmas_tree_lights.frag"
        property vector3d iResolution: Qt.vector3d(root.width, root.height, 0)
        property real iTime: 0

        Text {
            text: "Time: " + parent.iTime.toFixed(2)
            color: "white"
        }

        Timer {
            running: true
            repeat: true
            interval: 10
            onTriggered: parent.iTime += 0.01;
        }
    }
}
