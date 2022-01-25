import React from 'react';
import '../Button.scss'

export default function Button({value, onClick, id}) {


    return(
       <button onClick={() => {onClick(value)}} 
       className={`Button  ${ (value === 'x' || value === '-' || value === '+' || value === '/' || value === '=') ? "operator" :"" } ${ (value === 'AC' || value === '0') ? "large" :"" }`} 
       value={value} id={id}>{value}</button>
    )
}
