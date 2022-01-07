precision mediump float;
precision mediump int;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

float alpha(float sdfValue) {
    float threshold  = 0.5;
    float blurRadius = 0.01;

    return smoothstep(
    threshold - blurRadius,
    threshold + blurRadius,
    sdfValue
    );
}

float median(float r, float g, float b) {
    return max(
    min(r, g),
    min(
    max(r, g),
    b
    )
    );
}

float median(vec3 rgb) {
    return median(rgb.r, rgb.g, rgb.b);
}

void main() {
    vec2 uv = vUv;
    float sdfValue = median(
    texture2D(uTexture, uv).rgb
    );

    gl_FragColor = vec4(
    vec3(0.0, 0.0, 0.0),
    alpha(sdfValue)
    );
}