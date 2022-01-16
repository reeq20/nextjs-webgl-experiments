import {useEffect, useRef, useState, VFC} from 'react';
import {Canvas, Vector2, Vector2Props} from '@react-three/fiber';
import {Vector3Tuple} from 'three/src/math/Vector3';

type MeshArgs = {
    position: Vector3Tuple
    rotation: Vector3Tuple
    sizes: Vector3Tuple
}

type BoxProps = {
    mouseMove: Vector2 | Vector2Props
} & MeshArgs

const Box: VFC<BoxProps> = ({position, rotation, sizes, mouseMove}) => {
    const refMesh = useRef(null);
    useEffect(() => {
        console.log(refMesh);
    }, []);

    return (
        <mesh ref={refMesh} position={position} rotation={rotation}>
            <boxGeometry args={sizes}/>
            <meshNormalMaterial/>
        </mesh>
    );
};

const Presenter: VFC = () => {
    const refCanvas = useRef(null);
    const mouseMove = useRef<Vector2 | Vector2Props>({x: 0, y: 0});

    const [meshes, setMeshes] = useState<MeshArgs[]>([
        {
            position: [0, 0, 0],
            rotation: [1, 1, 1],
            sizes: [1, 1, 1]
        },
    ]);

    const handleClick = () => {
        setMeshes(
            [...meshes, {
                position: [Math.random(), Math.random(), Math.random()],
                rotation: [1, 1, 1],
                sizes: [1, 1, 1]
            }]
        );
    };

    return (
        <>
            <button className={'py-2 px-8 bg-white rounded-lg border-solid border-2 border-indigo-600'}
                    onClick={handleClick}>addMesh
            </button>
            <Canvas
                ref={refCanvas}
                camera={{far: 30, fov: 30, near: 0.1, position: [0, 0, 10]}}
                dpr={2}
                frameloop={'always'}
                resize={{debounce: {resize: 1, scroll: 1}}}
            >
                {meshes && meshes.map((v, index) => {
                    return (
                        <Box key={index} position={v.position} rotation={v.rotation} sizes={v.sizes}
                             mouseMove={mouseMove.current}/>
                    );
                })}
            </Canvas>
        </>
    );
};

export default Presenter;