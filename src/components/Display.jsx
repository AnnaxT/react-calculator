import React from 'react';
import '../Display.scss';

export default function Display({ topValues, bottomValue,id }) {

    // change font size

    let fontSize, bn = bottomValue.length;

    if (bn <=8) fontSize = '3rem';
    if (bn > 8 ) fontSize = '2.75rem';
    if (bn > 10) fontSize = '2rem'; 
    if (bn >13 ) fontSize = '1.5rem';
    if (bn > 17)fontSize = '1.25rem'
    
    return(
<div className="Display" >
    <div className="topValues"> {topValues} </div>
    <div className="bottomValue" id={id} style = {{ fontSize }}> {bottomValue} </div>
</div>
    );
}