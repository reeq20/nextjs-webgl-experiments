import {useEffect, useRef, VFC} from 'react';
import {Vector3Tuple} from 'three/src/math/Vector3';
import {Vector2, Vector2Props} from '@react-three/fiber';

export type MeshArgs = {
    position: Vector3Tuple
    rotation: Vector3Tuple
    sizes: Vector3Tuple
}

type BoxProps = {
    mouseMove: Vector2 | Vector2Props
} & MeshArgs

const BoxMesh: VFC<BoxProps> = ({position, rotation, sizes, mouseMove}) => {
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

export default BoxMesh;