<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .calculator {
            background-color: #2d2d2d;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 320px;
        }

        .display {
            background-color: #1a1a1a;
            color: #fff;
            font-size: 2.5em;
            padding: 20px;
            border-radius: 5px;
            text-align: right;
            margin-bottom: 20px;
            word-wrap: break-word;
            word-break: break-all;
            min-height: 60px;
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }

        button {
            padding: 20px;
            font-size: 1.5em;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s ease;
        }

        button:hover {
            transform: scale(1.05);
        }

        button:active {
            transform: scale(0.95);
        }

        .number {
            background-color: #4a4a4a;
            color: #fff;
        }

        .number:hover {
            background-color: #5a5a5a;
        }

        .operator {
            background-color: #ff9500;
            color: #fff;
        }

        .operator:hover {
            background-color: #ffb143;
        }

        .equals {
            background-color: #4caf50;
            color: #fff;
            grid-column: span 2;
        }

        .equals:hover {
            background-color: #66bb6a;
        }

        .clear {
            background-color: #f44336;
            color: #fff;
            grid-column: span 2;
        }

        .clear:hover {
            background-color: #ef5350;
        }

        .decimal {
            background-color: #4a4a4a;
            color: #fff;
        }

        .decimal:hover {
            background-color: #5a5a5a;
        }
    </style>
</head>
<body>

<div class="calculator">
    <div class="display" id="display">0</div>
    <div class="buttons">
        <button class="clear" onclick="clearDisplay()">C</button>
        <button class="operator" onclick="appendOperator('/')">/</button>
        <button class="operator" onclick="appendOperator('*')">×</button>

        <button class="number" onclick="appendNumber('7')">7</button>
        <button class="number" onclick="appendNumber('8')">8</button>
        <button class="number" onclick="appendNumber('9')">9</button>
        <button class="operator" onclick="appendOperator('-')">−</button>

        <button class="number" onclick="appendNumber('4')">4</button>
        <button class="number" onclick="appendNumber('5')">5</button>
        <button class="number" onclick="appendNumber('6')">6</button>
        <button class="operator" onclick="appendOperator('+')">+</button>

        <button class="number" onclick="appendNumber('1')">1</button>
        <button class="number" onclick="appendNumber('2')">2</button>
        <button class="number" onclick="appendNumber('3')">3</button>
        <button class="operator" onclick="deleteLastChar()">⌫</button>

        <button class="number" onclick="appendNumber('0')">0</button>
        <button class="decimal" onclick="appendNumber('.')">.</button>
        <button class="equals" onclick="calculateResult()">=</button>
    </div>
</div>

<script>
    let display = document.getElementById('display');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function appendNumber(number) {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            if (currentInput === '0' && number !== '.') {
                currentInput = number;
            } else if (number === '.' && currentInput.includes('.')) {
                return;
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    function appendOperator(op) {
        if (operation !== null && !shouldResetDisplay) {
            calculateResult();
        }
        previousInput = currentInput;
        operation = op;
        shouldResetDisplay = true;
    }

    function calculateResult() {
        if (operation === null || shouldResetDisplay) {
            return;
        }

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Error';
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        shouldResetDisplay = true;
        updateDisplay();
    }

    function clearDisplay() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function deleteLastChar() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    updateDisplay();
</script>

</body>
</html>
