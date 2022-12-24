#version 450

in vec4 fragCoord;

uniform vec3 iResolution; // viewport resolution (in pixels)
uniform float iTime;      // shader playback time (in seconds)

const float pi = 3.1415927;
const float dotsnbt = 90.0; // Number of dots for the tree
const float dotsnbs = 20.0; // Number of dots for the star (per circle)

vec3 hsv2rgb (vec3 hsv) { // from HSV to RGB color vector
    hsv.yz = clamp (hsv.yz, 0.0, 1.0);
    return hsv.z * (1.0 + 0.63 * hsv.y * (cos (2.0 * 3.14159 * (hsv.x + vec3 (0.0, 2.0 / 3.0, 1.0 / 3.0))) - 1.0));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float time = iTime;
    float mx = max(iResolution.x, iResolution.y);
    vec2 scrs = iResolution.xy / mx;
    vec2 uv = vec2(fragCoord.x, iResolution.y - fragCoord.y) / mx;
    //vec2 m = vec2(mouse.x / scrs.x, mouse.y * (scrs.y / scrs.x));

    vec2 pos = vec2(0.0);               // Position of the dots
    vec3 col = vec3(0.0);               // Color of the dots
    float intensitys = 1.0 / 4000.0;    // Light intensity for the star
    float intensityt = 1.0 / 2000.0;    // Light intensity for the tree
    float scale = 0.2;                  // Size of the star

    /*** Star ***/
    for(float i = 0.0 ; i < dotsnbs; i++){
        pos = vec2(cos(time * 0.2) / 20.0 * cos(2.0 * pi * i / dotsnbs),
                   0.15 * sin(2.0 * pi * i / dotsnbs)) * scale;
        pos += vec2(scrs.x / 2.0, scrs.y * 0.11);

        col += hsv2rgb(vec3(i / dotsnbs, distance(uv, pos) * (1.0 / intensitys), intensitys / distance(uv, pos)));

        pos = vec2(0.12 * cos(2.0 * pi * i / dotsnbs + time * 0.2),
                   0.08 * sin(2.0 * pi * i / dotsnbs)) * scale;
        pos += vec2(scrs.x / 2.0, scrs.y * 0.11);

        col += hsv2rgb(vec3(1.0 - i / dotsnbs, distance(uv, pos) * (1.0 / intensitys), intensitys / distance(uv, pos)));

        pos = vec2(0.12 * cos(2.0 * pi * i / dotsnbs + time * 0.2),
                   -0.08 * sin(2.0 * pi * i / dotsnbs)) * scale;
        pos += vec2(scrs.x / 2.0, scrs.y * 0.11);

        col += hsv2rgb(vec3(i / dotsnbs, distance(uv, pos) * (1.0 / intensitys), intensitys / distance(uv, pos)));
    }

    /*** Tree ***/
    float angle = dotsnbt * 1.8; // Angle of the cone
    for(float i = 0.0 ; i < dotsnbt ; i++){
        pos = vec2(scrs.x / 2.0 + sin(i / 2.0 - time * 0.2) / (3.0 / (i + 1.0) * angle),
                   scrs.y * ((i) / dotsnbt + 0.21) * 0.80);

        col += hsv2rgb(vec3(1.5 * i / dotsnbt + fract(time / 4.0), distance(uv, pos) * (1.0 / intensityt), intensityt / distance(uv, pos)));
    }

    fragColor = vec4( col, 1.0 );
}

void main(void)
{
    mainImage(gl_FragColor, vec2(fragCoord.x, iResolution.y - fragCoord.y));
}
