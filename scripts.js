"use strict";

// Estructuras de datos
class Maqueta {
  constructor() {
    this.expression = ''; // Cadena que almacena la expresión completa
    this.result = '0';    // Resultado parcial o final
  }
}

class Elementos {
  constructor(tipo, valor) {
    this.tipo = tipo;   // Tipo de botón (ej. "digit", "operator", "sci-func", "control")
    this.valor = valor; // Valor que se agregará a la expresión
  }
}

// Lógica de la aplicación
function Ejecucion() {
  const maqueta = new Maqueta();
  return maqueta;
}

// Genera la estructura de la aplicación (Esta función se usa si se genera la calculadora dinámicamente)
function Esquema(maqueta) {
  const contenedor = document.createElement('div');
  contenedor.id = 'calculadora';

  // Display de la expresión
  const expressionDisplay = document.createElement('div');
  expressionDisplay.id = 'expression';
  contenedor.appendChild(expressionDisplay);

  // Display del resultado
  const resultDisplay = document.createElement('div');
  resultDisplay.id = 'result';
  contenedor.appendChild(resultDisplay);

  // Contenedor de botones
  const buttonsContainer = document.createElement('div');
  buttonsContainer.id = 'buttonsContainer';

  // Botones estándar de la calculadora
  const btnValues = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];
  btnValues.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.setAttribute('data-value', val);
    btn.textContent = val;
    buttonsContainer.appendChild(btn);
  });

  // Botones de funciones de ingeniería
  const sciFunctions = ['sin', 'cos', 'tan', 'log', 'sqrt', '^', 'factorial', 'pi'];
  sciFunctions.forEach(func => {
    const sciBtn = document.createElement('button');
    sciBtn.className = 'sci-func';
    sciBtn.setAttribute('data-func', func);
    sciBtn.textContent = func;
    buttonsContainer.appendChild(sciBtn);
  });

  // Botón de limpiar
  const clearBtn = document.createElement('button');
  clearBtn.id = 'clearBtn';
  clearBtn.textContent = 'C';
  buttonsContainer.appendChild(clearBtn);

  contenedor.appendChild(buttonsContainer);
  return contenedor;
}

// Acciones
function handleSciFunction(func) {
  switch (func) {
    case 'sin':
      currentMaqueta.expression += 'sin(';
      break;
    case 'cos':
      currentMaqueta.expression += 'cos(';
      break;
    case 'tan':
      currentMaqueta.expression += 'tan(';
      break;
    case 'log':
      currentMaqueta.expression += 'log(';
      break;
    case 'sqrt':
      currentMaqueta.expression += 'sqrt(';
      break;
    case '^':
      currentMaqueta.expression += '^';
      break;
    case 'factorial':
      currentMaqueta.expression += 'fact(';
      break;
    case 'pi':
      currentMaqueta.expression += 'π';
      break;
    default:
      break;
  }
  updateDisplays();
}

function updateDisplays() {
  const expressionDisplay = document.getElementById('expression');
  const resultDisplay = document.getElementById('result');
  expressionDisplay.textContent = currentMaqueta.expression;
  try {
    const partial = parseExpression(currentMaqueta.expression);
    if (partial !== '') {
      resultDisplay.textContent = partial;
    }
  } catch (err) {
    resultDisplay.textContent = 'Error';
  }
}

function calculateResult() {
  const expressionDisplay = document.getElementById('expression');
  const resultDisplay = document.getElementById('result');
  try {
    const finalResult = parseExpression(currentMaqueta.expression);
    resultDisplay.textContent = finalResult;
    currentMaqueta.expression = finalResult.toString();
    expressionDisplay.textContent = currentMaqueta.expression;
  } catch (error) {
    resultDisplay.textContent = 'Error';
  }
}

function parseExpression(expr) {
  if (!expr) return '';

  // Reemplazamos log(...) para manejar la posible coma de "log base"
  expr = expr.replace(/log\(([^)]*)\)/g, function(match, content) {
    // "content" es lo que está dentro de log(...)
    // Dividimos por la coma
    const parts = content.split(',');

    if (parts.length === 1) {
      // => log(x) sin coma => log base 10
      // Posible caso "log(8,9)" donde "8,9" sea decimal... lo tratamos luego
      // Pero OJO, podría traer "8,9" como decimal dentro => lo convertimos a punto:
      const x = parts[0].replace(',', '.').trim();
      return `Math.log10(${x})`;
    } else if (parts.length === 2) {
      // => log(x,y) => log base y de x
      // Manejar decimales en cada parte
      const x = parts[0].replace(',', '.').trim();
      const y = parts[1].replace(',', '.').trim();
      return `(Math.log(${x}) / Math.log(${y}))`;
    } else {
      // => log(...) con más de una coma => Error o manejarlo como prefieras
      return 'Error';
    }
  });

  // Reemplazar el resto de comas por puntos (decimales).
  // Aquí ya no se afectan las llamadas a log() porque las
  // hemos convertido a Math.log(...) en el paso anterior.
  expr = expr.replace(/,/g, '.');

  // Resto de reemplazos
  expr = expr.replace(/mod/g, '%');
  expr = expr.replace(/π/g, 'Math.PI');
  expr = expr.replace(/fact\(([^)]+)\)/g, 'factorial($1)');
  expr = expr.replace(/sin\(/g, 'Math.sin(');
  expr = expr.replace(/cos\(/g, 'Math.cos(');
  expr = expr.replace(/tan\(/g, 'Math.tan(');
  expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
  expr = expr.replace(/\^/g, '**');

  // Insertar * cuando hay (número o ) inmediatamente seguido de (
  expr = expr.replace(/(\d|\))\(/g, '$1*(');

  // Definir factorial para n! 
  function factorial(n) {
    n = parseInt(n, 10);
    if (n < 0) return Error;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }
    return res;
  }

  // Evaluar la expresión final
  try {
    const resultado = eval(expr);

    // Si es NaN o Infinito, forzamos "Error"
    if (typeof resultado === 'number' && (isNaN(resultado) || !isFinite(resultado))) {
      return 'Error';
    }
    return resultado;
  } catch {
    // Si hay error de sintaxis o excepción, devolvemos "Error"
    return 'Error';
  }
}

// -------------------------------------------------------------------
// Funcionalidades específicas de JavaScript
// -------------------------------------------------------------------
function attachEventListeners() {
  const expressionDisplay = document.getElementById('expression');
  const resultDisplay = document.getElementById('result');
  const clearBtn = document.getElementById('clearBtn');

  // Escuchar clicks en cada botón estándar (.btn) EXCEPTO el botón de retroceso
  const buttons = document.querySelectorAll('.btn:not(.backspace):not(.flat-icon)');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value');
      if (value) {
        if (value === '=') {
          calculateResult();
        } else {
          currentMaqueta.expression += value;
          updateDisplays();
        }
      }
    });
  });

  /* --------------------------------------------------------------------------------
    Funcionalidad para botón de símbolos especiales
  ----------------------------------------------------------------------------------- */
  // Captura el botón de activación y el menú de símbolos especiales
  const specialCharsBtn = document.getElementById('specialCharsBtn');
  const specialCharsMenu = document.getElementById('specialCharsMenu');

  // Alternar visibilidad con clase "active"
  specialCharsBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      specialCharsMenu.classList.toggle('active'); // Activa o desactiva el menú
  });

  // Escuchar eventos en cada símbolo especial dentro del menú desplegable
  specialCharsMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (event) => {
          event.stopPropagation(); // Evitar que el evento suba
          currentMaqueta.expression += item.getAttribute('data-value');
          updateDisplays();
          
          // Cerrar el menú correctamente
          specialCharsMenu.classList.remove('active');
      });
  });

  // Cerrar el menú cuando se haga clic fuera de él
  document.addEventListener('click', function(event) {
      if (!specialCharsMenu.contains(event.target) && event.target !== specialCharsBtn) {
          specialCharsMenu.classList.remove('active');
      }
  });
  
  // Escuchar clicks en botones de funciones de ingeniería (.sci-func)
  const sciButtons = document.querySelectorAll('.sci-func');
  sciButtons.forEach(sciBtn => {
    sciBtn.addEventListener('click', () => {
      const func = sciBtn.getAttribute('data-func');
      handleSciFunction(func);
    });
  });

  // Botón de limpiar
  clearBtn.addEventListener('click', () => {
    currentMaqueta.expression = '';
    resultDisplay.textContent = '0';
    expressionDisplay.textContent = '';
  });

  // Escuchar click para el botón de retroceso (backspace)
  const backspaceButton = document.querySelector('.btn.backspace');
  if (backspaceButton) {
    backspaceButton.addEventListener('click', () => {
      // Elimina el último carácter de la expresión
      currentMaqueta.expression = currentMaqueta.expression.slice(0, -1);

      // Si la expresión está vacía después de borrar, reiniciar a "0"
      if (currentMaqueta.expression === '') {
        document.getElementById('result').textContent = '0';
        document.getElementById('expression').textContent = '';
      } else {
        updateDisplays();
      }
    });
  }

  // Capturar eventos de teclado
  window.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') {
      clearBtn.click();
      return;
    }
    if (key === 'Backspace') {
      const backspaceBtn = document.querySelector('.btn.backspace');
      if (backspaceBtn) {
        backspaceBtn.click();
      }
      return;
    }
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '(', ')', ',', '°'];
    if (validKeys.includes(key)) {
      const button = document.querySelector(`.btn[data-value="${key}"]`);
      if (button) {
        button.click();
      } else {
        // Si no existe botón, agrega el carácter directamente
        currentMaqueta.expression += key;
        updateDisplays();
      }
    }
  });
}

// Inicialización de la aplicación al cargar la página
let currentMaqueta;
document.addEventListener('DOMContentLoaded', function() {
  currentMaqueta = Ejecucion();
  attachEventListeners();
});
