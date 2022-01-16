import Presenter from '@/components/pages/AddMeshByDndPage/Presenter';
import {VFC} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const Index: VFC = () => {
    return(
        <>
            <DndProvider backend={HTML5Backend}>
                <Presenter />
            </DndProvider>
        </>
    );
};

export default Index;