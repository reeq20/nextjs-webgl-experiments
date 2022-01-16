import {VFC} from 'react';
import Link from 'next/link';

const Header: VFC = ()=>{
    return(
        <header>
            <ul className={'flex'}>
                <li>
                    <Link href={'/msdf'}>
                        <a className={'mr-4'}>
                            msdf
                        </a>

                    </Link>
                </li>
                <li>
                    <Link href={'/add-mesh'}>
                        <a className={'mr-4'}>
                            add-mesh
                        </a>

                    </Link>
                </li>
                <li>
                    <Link href={'/add-mesh-by-dnd'}>
                        <a className={'mr-4'}>
                            add-mesh-by-dnd
                        </a>

                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;