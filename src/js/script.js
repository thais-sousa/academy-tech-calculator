'use strict'

const screen = document.querySelector(".screen");
const clearScreen = document.querySelector(".btn-clear");
const deleteCharacter = document.querySelector(".btn-delete");
const numbers = document.querySelectorAll(".btn-number");
const operator = document.querySelectorAll(".btn-operator");
const equals = document.querySelector(".btn-equals");
const dotButton = document.querySelector(".btn-dot");

let newNumber = true; 
let clickedOperator; 
let oldNumber; 


const refreshScreen = (num) => {
    if(newNumber) {
        screen.textContent = num;
        newNumber = false;
    } else {
        screen.textContent += num;
    }   
}

const insertNumber = (event) => refreshScreen(event.target.textContent);


numbers.forEach(num => num.addEventListener("click", insertNumber));


dotButton.addEventListener("click", function () {
    if(!screen.textContent.indexOf (".") != -1) {
        if(screen.textContent.length > 0) {
            refreshScreen(".")
        } else {
            refreshScreen("0.");
        }
    }
})


const setOperator = (event) => {
    if(!newNumber) { 
        calculate();
        newNumber = true; 
        clickedOperator = event.target.textContent; 
        oldNumber = parseFloat(screen.textContent);
    }
}

operator.forEach(oper => oper.addEventListener("click", setOperator));


const calculate = () => {
    if(clickedOperator != undefined) {
        const currentNumber = parseFloat(screen.textContent);
        newNumber = true; //atualizar a tela

        switch (clickedOperator) {
            case "+" :
                refreshScreen (oldNumber + currentNumber);
                break;
            
            case "-" :
                refreshScreen (oldNumber - currentNumber);
                break;
        
            case "x" :
                refreshScreen (oldNumber * currentNumber);
                break;
        
            case "÷" :
                refreshScreen (oldNumber / currentNumber);
                break;
        
            case "%" :
                refreshScreen (oldNumber * (currentNumber/100)); 
                break;
        }
    }  
}


equals.addEventListener("click", calculate);

const checkResult = () => {
    if (screen.textContent.length > 9) {
        screen.textContent.toExponential(5);
    }
}

clearScreen.addEventListener("click", function () {
    screen.textContent = " "; 
    clickedOperator = undefined; 
    newNumber = true;
    oldNumber = undefined;
})


deleteCharacter.addEventListener("click", function () {
    screen.textContent = screen.textContent.slice(0, -1);
})



