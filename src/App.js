import React, { useState } from 'react';
import Button from './components/Button.jsx';
import Display from './components/Display.jsx';
import Layout from './components/Layout';
// import './App.css';

const DIGIT = 'DIGIT';
const OPERATOR = 'OPERATOR';

export default function App() {

    const [currentValue, setCurrentValue] = useState('0');
    const [lastClicked, setLastClicked] = useState(null);
    const [lastOperatorUsed, setLastOperatorUsed] = useState(null);
    const [history, setHistory] = useState([]);
    const [memoryValue, setMemoryValue] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);


    // DIGIT
    const handleDigit = (digit) => {
    
    if (isDisabled) return;
    if (reachedLimit()) return;

    // Prevent multiple zeros
    if (currentValue === '0' && digit === '0') return;
    
    // Add zero before decimal point
    if (currentValue === '0'  && digit === '.') {
        setCurrentValue('0.');
      }
    if (currentValue === '-' && digit === '.') {   
      setCurrentValue('-0.');
    }

    // If clicked on decimal and there is already a decimal point
    if (digit==='.' && currentValue.includes('.')) return;
    
    // Clicked on digit right after clicking on equals - clear memory
    if (lastOperatorUsed === '=') {
        setCurrentValue(digit === '.'? '0.' : digit);
        setMemoryValue(null);
        setLastOperatorUsed(null);
        setHistory([]);
    }

    // If current value is zero or is empty
    else if ((currentValue === '0' && digit !== '.' ) || currentValue === '') {
        setCurrentValue(digit);
    }

    // If previously clicked on digit or current value is negative sign
    else if ((lastClicked === DIGIT) || (currentValue === '-' && digit !=='.')) {
        setCurrentValue(currentValue + digit);
     }

    // If last time clicked on operator
    else if (lastClicked === OPERATOR && currentValue !== '-') {

    // Store current value in memory and set current value to clicked digit
    setCurrentValue((digit === '.' && currentValue !== '-') ? '0.' : (digit === '.' && currentValue === '-') ? '-0.' : digit);
    setMemoryValue(currentValue);
  }

    setLastClicked(DIGIT);

}

// operators

const handleOperator = (operator) => {

    if (isDisabled) return;

    // If clicked on operator with no current value - exclude '-'
    if (lastOperatorUsed === null && lastClicked !== DIGIT && operator !== '-') return;

    if (lastOperatorUsed === '=' & operator === '=') return;

    if (currentValue === '0.' || currentValue === '-0.') return;

    // Set current value to negative
    if ((currentValue === '0' || currentValue === "") && operator === '-') {
      setCurrentValue('-'); 
  }

    // Clicked the same operator twice, do nothing - exclude '-'
    if (lastClicked === OPERATOR && (lastOperatorUsed === operator && operator !== "-")) return;

     // If current value is zero, empty and clicked on -
    if ((currentValue === '0' || currentValue === '') && operator ==='-'){
      setCurrentValue('-');
     }


    // Repetedly clicked on operator, assign the latest - exclude '-'
    else if (lastClicked === OPERATOR && lastOperatorUsed !== '=' && lastOperatorUsed !== '-' && operator !== '-' ) {

        if (currentValue === '-') {
          setCurrentValue('0')
        }
        setLastOperatorUsed(operator);
        setHistory((history.slice(0,-1)).concat(operator));        
   }

    // Clicked on '-' after clicking anithe roperator, set current value to nagative
   else if (lastClicked === OPERATOR && lastOperatorUsed !== '=' && operator === '-') {
    setCurrentValue('-')     
}

   // Right after clinking on equals clikced on operator
   else if (lastOperatorUsed === '=') {
    setMemoryValue(currentValue);
    setHistory([currentValue, operator]);
    setLastOperatorUsed(operator);
   }

    else if (lastClicked === DIGIT) {
    updateResult();
    setHistory(history.concat([currentValue, operator]));
    setLastOperatorUsed(operator);
  }

    setLastClicked(OPERATOR);

}

  // Updates result
  const updateResult = () => {
    // There is something in memory
    if (memoryValue) {
      // Calculate the result and clear memory
      setCurrentValue(calculate(memoryValue, currentValue, lastOperatorUsed));
      setMemoryValue(null);
    } else {
      // There is nothing in memory so update memory
      setMemoryValue(currentValue);
    }
  };

  // PLUS / MINU
  const handlePlusMinus = () => { 

    if (currentValue === "ERROR" || currentValue === "0" || currentValue === "" ) return;
    setCurrentValue(currentValue > 0 ? '-' + currentValue : currentValue.slice(1));
  }

// PERCENTAGE
  if (currentValue === "ERROR") return;
  const handlePercentage = () => {
    setCurrentValue((parseFloat(currentValue)/100).toString());
  }

// DIVIDE BY
const handleDivide = () => {

    if (currentValue === "0" || currentValue === "") {
      setCurrentValue('ERROR');
        setHistory([]);
        setLastClicked(null);
        setLastOperatorUsed(null);
        setMemoryValue(null);

        setTimeout(() => {
          setCurrentValue('0')
        },1250)

    } else  { 
      setCurrentValue((1/parseFloat(currentValue)).toString());
    }
}

// EQUALS
const handleEquals = () => {

    if (isDisabled) return;

    // If last clicked on equals or there is nothing to calculate
    if (lastOperatorUsed === '=' || lastOperatorUsed === null) return;

    // User is trying to divide by zero
    if (lastOperatorUsed === '/' && currentValue === '0') {
        setCurrentValue('ERROR');
        setHistory([]);
        setLastClicked(null);
        setLastOperatorUsed(null);
        setMemoryValue(null);

        setTimeout(() => {
          setCurrentValue('0')
        },1250)
    }
    // Clicked on equals right after clicking on operator
    else if (lastClicked === OPERATOR && !memoryValue) {
        setHistory(history.slice(0, -1).concat(['=', currentValue]));
    } else {
     // Update current value and history
     updateResult();
     setHistory(
       history.concat([
         currentValue,
         '=',
         calculate(memoryValue, currentValue, lastOperatorUsed),
       ])
     );
 };

 setLastClicked(OPERATOR);
 setLastOperatorUsed('=');
}

// Clear All
const handleClear = () => {
    setCurrentValue('0');
    setLastClicked(null);
    setLastOperatorUsed(null);
    setHistory([]);
    setMemoryValue(null)
    setIsDisabled(false)  
}

// Digit limit
const reachedLimit = () => {
    if (currentValue.length > 10 && lastClicked === DIGIT) { 
        
        setTimeout(() => {
            setCurrentValue(currentValue);
            setIsDisabled(false);
          }, 1250);

        setCurrentValue('LIMIT REACHED');
        setIsDisabled(true);
        return true;
    }
    }

function calculate(a,b,operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    let result;
    switch(operator) {
        case '+':
            result = a+b;
            break;
        case '-':
            result = a-b;
            break;
        case 'x':
            result = a*b;
            break;
        case '/':
            result = a/b;
    }
    return result.toString();
}

return(
    <Layout
      display={<Display id="display" topValues={history.join(' ')} bottomValue={currentValue}/>} 
      buttons={
        <>
        <Button id="clear" onClick={handleClear} value="AC" />
        <Button id="delete" onClick={handleDivide} value="1/x" />
        <Button id="plusMinus" onClick={handlePlusMinus} value="+/-" />
        <Button id="divide" onClick={handleOperator} value="/" />

        <Button id="seven" onClick={handleDigit} value="7" />
        <Button id="eight" onClick={handleDigit} value="8" />
        <Button id="nine" onClick={handleDigit} value="9" />
        <Button id="multiply" onClick={handleOperator} value="x" />

        <Button id="four" onClick={handleDigit} value="4" />
        <Button id="five" onClick={handleDigit} value="5" />
        <Button id="six" onClick={handleDigit} value="6" />
        <Button id="subtract" onClick={handleOperator} value="-" />

        <Button id="one" onClick={handleDigit} value="1" />
        <Button id="two" onClick={handleDigit} value="2" />
        <Button id="three" onClick={handleDigit} value="3" />
        <Button id="add" onClick={handleOperator} value="+" />
        <Button id="zero" onClick={handleDigit} value="0" />
        <Button id="decimal" onClick={handleDigit} value="." />
        <Button id="percentage" onClick={handlePercentage} value="%" />
        <Button id="equals" onClick={handleEquals} value="=" />
       </>
      }
    />
      )
}

