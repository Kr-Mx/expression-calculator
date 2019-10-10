function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    //фильтрация входного массива
    let array = expr.split("").filter(item => (item !== " " && item !== ""));
    for (let i = 0; i < array.length; i++) {
        if (isFinite(array[i]) && isFinite(array[i + 1])
            && array[i + 1] !== array.length) {
            array.splice(i, 2, (array[i]) + array[i + 1]);
            i--
        }
    }

// проверка правильности скобок
    function bracketsCheck() {
        let bracketsCounter = [];
        for (let p = 0; p < array.length; p++) {
            if (array[p] === "(") {
                bracketsCounter.push(array[p]);
            } else if (array[p] === ")" && bracketsCounter[+bracketsCounter.length - 1] === "(") {
                bracketsCounter.pop()
            } else if (array[p] === ")" && bracketsCounter[+bracketsCounter.length - 1] !== "(") {
                bracketsCounter.push(array[p])
            }
        }
        if (bracketsCounter.length !== 0) {
            throw new Error("ExpressionError: Brackets must be paired")
        }
    }

    bracketsCheck();

// работа со скобками
    function bracketsManipulation() {
        let bracketsStuck = [];
        let numbersStuck = [];
        while (array.length > 1 && array.includes("(") && array.includes(")")) {

            for (let o = 0; o < array.length; o++) {
                if (array[o] === "(") {
                    bracketsStuck.push(array[o]);
                    numbersStuck.push(o)
                } else if (array[o] === ")" && bracketsStuck[+bracketsStuck.length - 1] === "(") {
                    let buffer = array.slice(+numbersStuck[numbersStuck.length - 1] + 1, +o);
                    array.splice(+numbersStuck[numbersStuck.length - 1],
                        +o - +numbersStuck[numbersStuck.length - 1] + 1,
                        simpleCalculation(buffer));
                    bracketsStuck = [];
                    numbersStuck = [];
                    buffer = 0;
                    o = 0;
                    break
                }
            }
        }
        if (!array.includes("(" && ")")) {
            simpleCalculation(array);
        }
        return +array.join("")
    }

// выполнение простой арифметики
    function simpleCalculation(array) {
        while (array.length !== 1) {
            if (array.includes("/")) {
                for (let j = 0; j < array.length; j++) {
                    if (array[j] === "/" && +array[j + 1] !== 0) {
                        array.splice(j - 1, 3, ((+array[j - 1]) / (+array[j + 1])));
                        j--
                    } else if (array[j] === "/" && +array[j + 1] === 0) {
                        throw new Error("TypeError: Devision by zero.")
                    }
                }
            } else if (array.includes("*") && !array.includes("/")) {
                for (let k = 0; k < array.length; k++) {
                    if (array[k] === "*") {
                        array.splice(k - 1, 3, ((+array[k - 1]) * (+array[k + 1])));
                        k--
                    }
                }
            } else if (array.includes("-") && !array.includes("/") && !array.includes("*")) {
                for (let n = 0; n < array.length; n++) {
                    if (array[n] === "-") {
                        array.splice(n - 1, 3, ((+array[n - 1]) - (+array[n + 1])));
                        n--
                    }
                }
            } else if (array.includes("+") && !array.includes("/") && !array.includes("*") && !array.includes("-")) {
                for (let m = 0; m < array.length; m++) {
                    if (array[m] === "+") {
                        array.splice(m - 1, 3, ((+array[m - 1]) + (+array[m + 1])));
                        m--
                    }
                }
            }
        }
        return +array.join("")
    }

    return +bracketsManipulation()
}


module.exports = {
    expressionCalculator
}