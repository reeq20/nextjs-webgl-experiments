import {CSSProperties, ReactNode, useCallback, useEffect, useRef, useState, VFC} from 'react';
import {Canvas, Vector2, Vector2Props} from '@react-three/fiber';
import {Vector3Tuple} from 'three/src/math/Vector3';
import {useDrag, useDrop, XYCoord} from 'react-dnd';
import {useWindowSize} from 'react-use';
import BoxMesh from '@/components/model/Mesh/BoxMesh';
import { PerspectiveCamera } from '@react-three/drei';
type DragItem = {
    type: string;
    id: string;
    top: number;
    left: number;
};


const style: CSSProperties = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
};

export interface BoxProps {
    id: any;
    left: number;
    top: number;
    hideSourceOnDrag?: boolean;
    children?: ReactNode;
}

export type MeshArgs = {
    id: number | string
    position: Vector3Tuple
    rotation: Vector3Tuple
    sizes: Vector3Tuple
}

// type BoxMeshProps = {
//     mouseMove: Vector2 | Vector2Props
// } & MeshArgs
//
// // const BoxMesh: VFC<BoxMeshProps> = ({position, rotation, sizes, mouseMove}) => {
// //     const refMesh = useRef(null);
// //     useEffect(() => {
// //         console.log(refMesh);
// //     }, []);
// //
// //     return (
// //         <mesh ref={refMesh} position={position} rotation={rotation}>
// //             <boxGeometry args={sizes}/>
// //             <meshNormalMaterial/>
// //         </mesh>
// //     );
// // };

const Box: VFC<BoxProps> = ({id, left, top, children}) => {
    const [{isDragging}, drag] = useDrag(
        () => ({
            type: 'box',
            item: {id, left, top},
            collect: monitor => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top]
    );

    if (isDragging) {
        return <div ref={drag}/>;
    }

    return (
        <>
            <div ref={drag} style={{...style, left, top}} className={'relative z-10'} role={'Box'}>
                {children}
            </div>
        </>
    );
};

const Presenter: VFC = () => {
    const refCanvas = useRef(null);
    const mouseMove = useRef<Vector2 | Vector2Props>({x: 0, y: 0});
    const {width, height} = useWindowSize();

    const [meshes, setMeshes] = useState<MeshArgs[]>([{
        position: [1, 1, 1],
        rotation: [0, 0, 0],
        sizes: [1, 1, 1]
    } as MeshArgs]);
    const [boxes, setBoxes] = useState<{ [key: string]: { top: number; left: number; title: string } }>({
        a: {top: 20, left: 80, title: 'Drag me around'},
        // b: { top: 100, left: 20, title: 'Drag me too' },
    });

    const moveBox = useCallback((id: string, x: number, y: number) => {
        console.log(x,y);
        const bMesh = [{
            id: Math.random(),
            position: [x, y, 1],
            rotation: [0, 0, 0],
            sizes: [1, 1, 1]
        } as MeshArgs];
        const r = meshes.concat(bMesh);

        setMeshes(r);
    },[]);

    // 受け取った時の処理？
    const [_, dropArea] = useDrop(
        () => ({
            accept: 'box',
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
                const hw = width / 2;
                const hh = height / 2;
                const left = ((item.left + delta.x) - hw) / hw;
                const top = -((item.top + delta.y) - hh) / hh;
                // setMeshes([{position: [0, 0, 0], rotation: [Math.random(), Math.random(), Math.random()], sizes: [0.1, 0.1, 0.1]} as MeshArgs]);
                moveBox(item.id, left, top);
                return;
            },
        }),
    );


    useEffect(()=>{
        console.log(refCanvas);
    },[refCanvas]);

    return (
        <>
            <Box id={1} left={100} top={100}>Sample</Box>
            <div ref={dropArea} className={'w-full h-full'}>
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
            </div>
        </>
    );
};

export default Presenter;