/**let string =" ";
let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click', (e)=>{
        if(e.target.innerHTML == '='){
            string= eval(string);
            document.querySelector('input').value = string;
        }
        else if(e.target.innerHTML == 'C'){
            string= " ";
            document.querySelector('input').value = string;}
        else{
            console.log(e.target)
            string = string + e.target.innerHTML;
            document.querySelector('input').value = string;
        }
       
    })
})**/
let string = '';
let memory = 0; // Memory storage
let hasError = false; // Track error state

let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        // If we're in error state, only allow clearing
        if (hasError && e.target.innerHTML !== 'C') {
            return;
        }

        try {
            if (e.target.innerHTML === '=') {
                // Basic validation before evaluation
                if (!string.trim()) {
                    throw new Error('Empty expression');
                }
                
                // Check for invalid characters
                if (/[a-zA-Z]/.test(string)) {
                    throw new Error('Invalid characters');
                }
                
                // Check for division by zero
                if (string.includes('/0') && !string.includes('/0.')) {
                    throw new Error('Division by zero');
                }
                
                string = eval(string).toString();
                document.querySelector('input').value = string;
            }
            else if (e.target.innerHTML === 'C') {
                string = '';
                hasError = false;
                document.querySelector('input').value = string;
            }
            else if (e.target.innerHTML === 'M+') {
                const value = parseFloat(string);
                if (isNaN(value)) {
                    throw new Error('Invalid number for memory');
                }
                memory += value;
            }
            else if (e.target.innerHTML === 'M-') {
                const value = parseFloat(string);
                if (isNaN(value)) {
                    throw new Error('Invalid number for memory');
                }
                memory -= value;
            }
            else if (e.target.innerHTML === 'MR') {
                string = memory.toString();
                document.querySelector('input').value = string;
            }
            else if (e.target.innerHTML === 'MC') {
                memory = 0;
            }
            else {
                // Prevent multiple decimal points in a number
                if (e.target.innerHTML === '.' && string.split(/[\+\-\*\/]/).pop().includes('.')) {
                    throw new Error('Multiple decimals');
                }
                
                // Prevent operator after another operator
                const lastChar = string.slice(-1);
                if (['+', '-', '*', '/'].includes(e.target.innerHTML) && 
                    ['+', '-', '*', '/'].includes(lastChar)) {
                    throw new Error('Consecutive operators');
                }
                
                string = string + e.target.innerHTML;
                document.querySelector('input').value = string;
            }
        } catch (error) {
            string = 'Error: ' + error.message;
            document.querySelector('input').value = string;
            hasError = true;
            console.error('Calculator error:', error);
        }
    });
});