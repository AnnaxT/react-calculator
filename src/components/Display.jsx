import React from 'react';
import '../Display.scss';

export default function Display({ topValues, bottomValue }) {

    // change font size

    let fontSize, bn = bottomValue.length;

    if (bn > 10 ) fontSize = '2.5rem';
    if (bn > 13) fontSize = '2.rem'; 
    if (bn >16 ) fontSize = '1.5rem';
    
    return(
<div className="Display">
    <div className="topValues"> {topValues} </div>
    <div className="bottomValue" style = {{ fontSize }}> {bottomValue} </div>
</div>
    );
}