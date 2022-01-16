import { useRef, useState } from 'react'
import {Canvas} from "@react-three/fiber";


const Box = ({position, rotation, sizes, mouseMove}) => {
    const refMesh = useRef(null)

    return (
        <mesh ref={refMesh} position={position} rotation={rotation}>
            <boxGeometry args={sizes}/>
            <meshNormalMaterial/>
        </mesh>
    )
}

const Presenter = () => {
    const canvasRef = useRef(null)
    const mouseMove = useRef({x: 0, y: 0})

    const [meshes, setMeshes] = useState([
        {
            position: [0, 0, 0],
            rotation: [1, 1, 1],
            sizes: [1, 1, 1]
        },

    ])

    const handleClick = () => {
        setMeshes(
            [...meshes, {
                position: [Math.random(), Math.random(), Math.random()],
                rotation: [1, 1, 1],
                sizes: [.1, .1, .1]
            }]
        )
    }

    return (
        <>
            <button className={"py-2 px-8 bg-white rounded-lg border-solid border-2 border-indigo-600"}
                    onClick={handleClick}>addMesh
            </button>
            <Canvas
                ref={canvasRef}
                camera={{far: 30, fov: 30, near: 0.1, position: [0, 0, 10]}}
                dpr={2}
                frameloop={"always"}
                resize={{debounce: {resize: 1, scroll: 1}}}
            >
                {meshes && meshes.map((v, index) => {
                    return (
                        <Box key={index} position={v.position} rotation={v.rotation} sizes={v.sizes}
                             mouseMove={mouseMove.current}/>
                    )
                })}
            </Canvas>
        </>
    )
}

export default Presenter;