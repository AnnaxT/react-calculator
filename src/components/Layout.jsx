import React from 'react';
import '../Layout.scss';

export default function Layout({top, middle}) {
    return(
        <div className='Layout'>
            <div className='container'>
                <div className='top'>
                    {top}
                </div>
                <div className='middle'>
                    {middle}
                </div>
            </div>
        </div>
    )
}