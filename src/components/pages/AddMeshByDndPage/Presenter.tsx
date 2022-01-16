import {useEffect, useRef, useState, VFC} from 'react';
import {Canvas, Vector2, Vector2Props} from '@react-three/fiber';
import {Vector3Tuple} from 'three/src/math/Vector3';
import MeshSelector from '@/components/model/MeshSelector/Default';
import BoxMesh, {MeshArgs} from '@/components/model/Mesh/BoxMesh';

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
            <MeshSelector />
            <Canvas
                ref={refCanvas}
                camera={{far: 30, fov: 30, near: 0.1, position: [0, 0, 10]}}
                dpr={2}
                frameloop={'always'}
                resize={{debounce: {resize: 1, scroll: 1}}}
            >
                {meshes && meshes.map((v, index) => {
                    return (
                        <BoxMesh key={index} position={v.position} rotation={v.rotation} sizes={v.sizes}
                             mouseMove={mouseMove.current}/>
                    );
                })}
            </Canvas>
        </>
    );
};

export default Presenter;