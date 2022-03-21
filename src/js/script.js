'use strict'

const display = document.querySelector(".screen");
const clearDisplay = document.querySelector(".btn-clear");
const deleteCharacter = document.querySelector(".btn-delete");
const numbers = document.querySelectorAll(".btn-number");
const operator = document.querySelectorAll(".btn-operator");
const equals = document.querySelector(".btn-equals");
const pointButton = document.querySelector(".btn-dot");

let newValue = true; 
let clickedOperator; 
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


const refreshScreen = (num) => {
    if(newValue) {
        display.textContent = num;
        newValue = false;
    } else {
        display.textContent += num;
    }   
}


const insertNumber = (event) => refreshScreen(event.target.textContent);

numbers.forEach(num => num.addEventListener("click", insertNumber));


const insertPoint = () => {
    if(newValue) {
        return refreshScreen("0.");
    } if(display.textContent.includes(".")) {
        return null;
    } else {
        refreshScreen (".");
    }
}

pointButton.addEventListener("click", insertPoint);


const setOperator = (event) => {
    if(!newValue) {       
        calculate();
        newValue = true; 
        clickedOperator = event.target.textContent; 
        oldValue = parseFloat(display.textContent);
    }
}

operator.forEach(oper => oper.addEventListener("click", setOperator));


const operatorEquals = (event) => {
    setOperator(event);
    // newValue = false;
}

equals.addEventListener("click", operatorEquals);


const checkResult = (num) => {
    if (num.toString().length > 9) {
        display.textContent = parseFloat(num.toExponential(5));
    }else{
        display.textContent  = num; // essa linha tem que aparecer no show display  
    }
}


const calculate = () => {
    if(clickedOperator != undefined) {
        let currentValue = parseFloat(display.textContent);
        newValue = true; //atualizar a tela

        switch (clickedOperator) {
            case "+" :
                result = (oldValue + currentValue);
                checkResult(result);
                break;
            
            case "-" :
                result = (oldValue - currentValue);
                checkResult(result);
                break;
        
            case "x" :
                result = (oldValue * currentValue);
                checkResult(result)
                break;
        
            case "÷" :
                if(currentValue == 0) {
                    refreshScreen ("A divisão por zero não é definida");
                } else {
                    result = (oldValue / currentValue);
                    checkResult(result)
                }
                break;
        
            case "%":
                if(result != 0) {
                    checkResult (result / 100);
                } else {
                    checkResult (oldValue * (currentValue/100));
                }
                break;
        }
    }
}


