let size = 10,
  sizeButton = document.getElementById('change-size'),
  select = document.querySelector('select'),
  clearButton = document.getElementById('clear'),
  container = document.querySelector('.row.justify-center-row'),
  table;

window.addEventListener('load', initialApp);

function initialApp() {
  // Initialize default table
  renderTable(size);

  // Event Listeners
  sizeButton.addEventListener('click', handleSizeRequest);
  clearButton.addEventListener('click', handleClearTable);
}

function renderTable(size) {
  // Create a new table
  table = new Table(size).element;

  // Display table
  container.appendChild(table);
}

class App {
  constructor(classNames, elementType = 'div') {
    this.createElementWithClass(classNames, elementType);
  }

  createElementWithClass(classNames, elementType) {
    this.element = document.createElement(elementType);
    this.element.setAttribute('class', classNames);
  }

  renderChildren(count, Child) {
    for (let i = 0; i < count; i++) {
      const childElement = new Child(count).element;
      this.element.appendChild(childElement);
    }
  }
}

class Table extends App {
  constructor(rowCount) {
    super('table row column');
    super.renderChildren(rowCount, Row);
  }
}
class Row extends App {
  constructor(squareCount) {
    super('f-1 row');
    super.renderChildren(squareCount, Square);
  }
}
class Square extends App {
  constructor() {
    super('f-1 square');
    this.element.addEventListener('mouseenter', changeBackgroundColor);
  }
}

// Event handlers
function handleSizeRequest() {
  const answer = getRequestedSize();
  if (answer === null) return;
  const sizeNumber = Number(answer);
  if (!sizeNumber || sizeNumber < 1 || sizeNumber > 100) {
    alert(`${sizeNumber} is not a valid number. Please try again.`);
    return handleSizeRequest();
  }

  // Update global size variable
  size = sizeNumber;
  createNewTable(size);
}
function handleClearTable() {
  createNewTable(size);
}
function changeBackgroundColor() {
  this.style.backgroundColor = '#000';
  this.removeEventListener('mouseenter', changeBackgroundColor);
}

// Helpers
function getRequestedSize() {
  return prompt(
    'Enter the number of squares in a range of 1 to 100 to change the table size. E.g. 10 means 10*10.'
  );
}
function createNewTable(size) {
  // Remove previous table
  container.removeChild(table);

  // Render a new table
  renderTable(Math.round(size));
}
