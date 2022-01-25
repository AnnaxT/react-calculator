import React from 'react';
import '../Layout.scss';

export default function Layout({display, buttons}) {
    return(
        <div className='Layout'>
            <div className='container'>
                <div className='display'>
                    {display}
                </div>
                <div className='buttons'>
                    {buttons}
                </div>
            </div>
        </div>
    )
}