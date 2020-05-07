document.addEventListener('DOMContentLoaded', ()=>{
    let flag = false;
    let lastOperator = '';
    const operators = ['/', '*', '-', '+'];
    const keys = document.querySelectorAll('.key');

    for (let i = 0; i < keys.length; i++) {
        keys[i].addEventListener('click', ()=>{

            const keyValue = event.target.innerHTML;
            const result = document.querySelector('#below');
            const actions = document.querySelector('#above');
            const actionValue = actions.innerHTML;
            const lastSign = actionValue[actionValue.length -1];

            // calculations
            switch(keyValue) {
                // case clear
                case 'C':
                    actions.innerHTML = '';
                    result.innerHTML = '0';
                break;
                // case equal
                case '=':
                    if (actions.innerHTML != '') {
                        result.innerHTML = eval(actionValue);
                        flag = false;
                    }
                break;
                // case operators
                case '/':
                case '*':
                case '-':
                case '+':
                    if (actionValue != '' && operators.indexOf(lastSign) == -1) {
                        actions.innerHTML += keyValue;
                    } else {
                        actions.innerHTML = actions.innerHTML.replace(/.$/, keyValue);
                    }
                    flag = false;
                    lastOperator = keyValue;
                break;
                // case delete
                case 'del':
                    if (lastSign == '.') flag = false;

                    actions.innerHTML = actions.innerHTML.replace(/.$/, '');
                break;
                // case point
                case '.':
                    if (!flag) {
                        actions.innerHTML += keyValue;
                        flag = true;
                    }
                break;
                // case reverse
                case '+/-':
                    if(actionValue != '' && operators.indexOf(lastSign) == -1) {
                        if (lastOperator == '') {
                            if (actionValue == Math.abs(actionValue)) {
                                actions.innerHTML = -(actionValue);
                            } else {
                                actions.innerHTML = Math.abs(eval(actionValue));
                            }
                        } else {
                            let array = actions.innerHTML.split(lastOperator);
                            let lastIndexArray = array.length -1;
                            let newSign = '';
                            let oldSign = '';

                            if(array[lastIndexArray] == Math.abs(array[lastIndexArray])) {
                                newSign = '(' + -(array[lastIndexArray]) + ')';
                            } else {
                                newSign = Math.abs(eval(array[lastIndexArray]));
                            }
                            for (let i = 0; i < lastIndexArray; i++) {
                                oldSign += array[i] + lastOperator;
                            }
                            actions.innerHTML = oldSign + newSign;
                        }
                    }
                break;
                // case numeric keys
                default:
                    actions.innerHTML += keyValue;
                break;
            }
            checkLength();
        })
    }
    // check length display
    checkLength = () => {
        const displayAbove = document.querySelector('#above');
        const displayBelow = document.querySelector('#below');
        above = displayAbove.innerHTML.length;
        below = displayBelow.innerHTML.length;

        if (above > 17) {
            displayAbove.innerHTML = 'error';
        } else if (above >= 15) {
            displayAbove.style.fontSize = '1.8rem';
        } else if (above >= 12) {
            displayAbove.style.fontSize = '2.2rem';
        } else {
            displayAbove.style.fontSize = '2.8rem'
        }

        if (below > 17) {
            displayBelow.innerHTML = 'error';
        } else if (below >= 15) {
            displayBelow.style.fontSize = '1.8rem';
        } else if (below >= 12) {
            displayBelow.style.fontSize = '2.2rem';
        } else {
            displayBelow.style.fontSize = '2.8rem'
        }
    }
    checkLength();
})