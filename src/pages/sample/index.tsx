import SamplePage from '@/components/pages/sample/Index';
import {VFC} from 'react';

const Sample: VFC = () => {
    return (
        <>
            <div className={'w-full h-screen'}>
                <SamplePage/>
            </div>
        </>
    );
};

export default Sample;