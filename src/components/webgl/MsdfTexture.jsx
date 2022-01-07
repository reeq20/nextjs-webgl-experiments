import {Suspense, useEffect, useRef} from 'react'
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {useWindowSize} from "react-use";
import vs from "../../glsl/vs.glsl"
import fs from "../../glsl/fs.glsl"
import * as THREE from "three";


const Scene = () => {
    const refMesh = useRef(null);
    const tex = useLoader(THREE.TextureLoader, 'hello-world-msdf-3.png')
    const {size} = useThree()
    const uniforms = useRef({
        uTexture: {value: tex},
        uResolution: {type: 'v2', value: new THREE.Vector2(size.width, size.height)},
        uTime: {type: "f", value: 0}
    })

    useFrame(({clock}) => {
        // const time = Math.sin(clock.elapsedTime / 2) * Math.cos(clock.elapsedTime / 2) + 0.5;

        const DURATION = 5; // [sec]
        const sbt = (clock.elapsedTime % DURATION) / DURATION;
        const time = (Math.sin(sbt * Math.PI * 2) + 1) / 2;

        console.log(time)
        refMesh.current.material.uniforms.uTime.value = time; // [sec/sec]


    })

    return (
        <>
            <mesh ref={refMesh}>
                <planeBufferGeometry args={[512, 512]}/>
                <shaderMaterial attach={'material'} fragmentShader={fs} uniforms={uniforms.current} vertexShader={vs}/>
            </mesh>
        </>
    )
}

const MsdfTexture = () => {
    return (
        <>
            <Canvas
                orthographic
                camera={{far: 10, fov: 30, near: 0.1, position: [0, 0, 5]}}
                dpr={2}
                frameloop={"always"}
                resize={{debounce: {resize: 1, scroll: 1}}}
            >
                <Suspense fallback={null}>
                    <Scene/>
                </Suspense>

            </Canvas>
        </>
    )
}

export default MsdfTexture