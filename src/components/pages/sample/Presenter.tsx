import {CSSProperties, ReactNode, useCallback, useEffect, useRef, useState, VFC} from 'react';
import {Canvas, Vector2, Vector2Props} from '@react-three/fiber';
import {Vector3Tuple} from 'three/src/math/Vector3';
import {useDrag, useDrop, XYCoord} from 'react-dnd';
import {useWindowSize} from 'react-use';
import {BoxProps} from '@/components/pages/AddMeshByDndPage/Presenter';

type Mesh={
    position: [number, number, number]
    rotation: [number, number, number]
    sizes: [number, number, number]
}

const BoxMesh: VFC<Mesh> = ({position, rotation, sizes}) => {
    const refMesh = useRef(null);
    useEffect(() => {
        console.log(refMesh?.current?.matrix!);
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
    const meshes:Mesh[] = [
        {
            position: [1, 1, 1],
            rotation: [0, 0, 0],
            sizes: [1, 1, 1]
        },
        {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            sizes: [0.5, 0.5, 0.5]
        },
        {
            position: [4.2, 4.2, 3],
            rotation: [0, 0, 0],
            sizes: [0.1, 0.1, 0.1]
        }
    ];

    useEffect(()=>{
        console.log(refCanvas);
    },[refCanvas]);

    return (
        <>
            <Canvas
                ref={refCanvas}
                camera={{
                    position: [1, 10, 5],
                    fov: 45,
                    near: 0.1,
                    far: 1000
                }}
                dpr={2}
                frameloop={'always'}
                resize={{debounce: {resize: 1, scroll: 1}}}
            >
                {meshes && meshes.map((v, index) => {
                    return (
                        <BoxMesh key={`test-${index}`} position={v.position} rotation={v.rotation} sizes={v.sizes}
                        />
                    );
                })}
            </Canvas>
        </>
    );
};

export default Presenter;