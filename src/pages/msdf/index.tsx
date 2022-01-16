import MsdfTexture from '@/components/pages/MsdfTexture/Presenter';
import {VFC} from 'react';

const Msdf: VFC = () => {
    return (
        <>
            <div className={'w-full h-screen'}>
                <MsdfTexture/>
            </div>
        </>
    );
};

export default Msdf;