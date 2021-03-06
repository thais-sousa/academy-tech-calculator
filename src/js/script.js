'use strict'

const display = document.querySelector(".screen");
const clearDisplay = document.querySelector(".btn-clear");
const deleteCharacter = document.querySelector(".btn-delete");
const numbers = document.querySelectorAll(".btn-number");
const operator = document.querySelectorAll(".btn-operator");
const equals = document.querySelector(".btn-equals");
const pointButton = document.querySelector(".btn-dot");

let clickedOperator; 
let limitOfDigits = 10;
let newValue = true;
let oldValue; 
let result = 0;


const clear = () => {
    display.textContent = " "; 
    clickedOperator = undefined; 
    newValue = true;
    oldValue = undefined;
    result = 0;
}

clearDisplay.addEventListener("click", clear);


deleteCharacter.addEventListener("click", function () {
    display.textContent = display.textContent.slice(0, -1);
})


const showDisplay = number => {
    if(newValue) {
        display.textContent = number;
        newValue = false;
    } else if (display.textContent.length < limitOfDigits) {
        display.textContent += number;
    }   
}


const insertNumber = event => showDisplay(event.target.textContent);

numbers.forEach(number => number.addEventListener("click", insertNumber));


const insertPoint = () => {
    if(newValue) {
        return showDisplay("0.");
    } if(display.textContent.includes(".")) {
        return null;
    } else {
        showDisplay (".");
    }
}

pointButton.addEventListener("click", insertPoint);


const setOperator = event => {
    if(!newValue) {       
        calculate();
        newValue = true; 
        clickedOperator = event.target.textContent; 
        oldValue = parseFloat(display.textContent);
    }
}

operator.forEach(oper => oper.addEventListener("click", setOperator));


const operatorEquals = event => {
    setOperator(event);
    newValue = false;
}

equals.addEventListener("click", operatorEquals);


const checkResult = number => {
    let value = number.toFixed(2);
    if (value.toString().length > limitOfDigits) {
       return parseFloat(value).toExponential(5);
    }else{
       return parseFloat(value); 
    }
}


const processingResultDisplay = number => {
    let resultFormate = checkResult(number);
    display.textContent = resultFormate;
}


const calculate = () => {
    if(clickedOperator !== undefined) {
        let currentValue = parseFloat(display.textContent);
        newValue = true; 

        switch (clickedOperator) {
            case "+" :
                result = (oldValue + currentValue);
                processingResultDisplay(result);
                break;
            
            case "-" :
                result = (oldValue - currentValue);
                processingResultDisplay(result);
                break;
        
            case "x" :
                result = (oldValue * currentValue);
                processingResultDisplay(result);
                break;
        
            case "??" :
                if(currentValue === 0) {
                    showDisplay ("A divis??o por zero n??o ?? definida");
                } else {
                    result = (oldValue / currentValue);
                    processingResultDisplay(result);
                }
                break;
        
            case "%":
                if(result !== 0) {
                    result = (result / 100);
                    processingResultDisplay(result);
                } else {
                    result = (oldValue * (currentValue/100));
                    processingResultDisplay(result);
                }
                break;
        }
    }
}


