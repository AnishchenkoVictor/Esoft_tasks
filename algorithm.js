function isValid(s) {
    const stack = [];
    
    const bracketMap = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (let char of s) {
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        } 
        else if (char === ')' || char === ']' || char === '}') {
            if (stack.length === 0) {
                return false;
            }
            
            const lastOpen = stack.pop();
            
            if (bracketMap[char] !== lastOpen) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}


console.log('Тест 1 "()" :', isValid("()")); //true
console.log('Тест 2 "()[]{}" :', isValid("()[]{}")); // true
console.log('Тест 3 "(]" :', isValid("(]")); // false
console.log('Тест 4 "([)]" :', isValid("([)]")); // false
console.log('Тест 5 "{[]}" :', isValid("{[]}")); // true
console.log('Тест 6 " " :', isValid("")); // true (пустая строка)
console.log('Тест 7 "((" :', isValid("((")); // false
console.log('Тест 8 "]" :', isValid("]")); // false
console.log('Тест 9 "{[()]}" :', isValid("{[()]}")); // true
console.log('Тест 10 "{[(])}" :', isValid("{[(])}")); // false

if (typeof module !== 'undefined' && module.exports) {
    module.exports = isValid;
}