// Global Variables
let size = 10,
  colorStyle = 0,
  table;

// DOM Elements
let sizeButton = document.getElementById('change-size'),
  select = document.querySelector('select'),
  clearButton = document.getElementById('clear'),
  container = document.querySelector('.row.justify-center-row');

// Initialize application
window.addEventListener('load', initialApp);

function initialApp() {
  // Initialize default table
  renderTable(size);

  // Event Listeners
  sizeButton.addEventListener('click', handleSizeRequest);
  select.addEventListener('change', handleColorStyleSelection);
  clearButton.addEventListener('click', handleClearTable);
}

function renderTable(size) {
  // Create a new table
  table = new Table(size).element;

  // Display table
  container.appendChild(table);
}

// Top class
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
// Parent of all the rows on a table.
class Table extends App {
  constructor(rowCount) {
    super('table row column');
    super.renderChildren(rowCount, Row);
  }
}
// Parent of all the squares on a line
class Row extends App {
  constructor(squareCount) {
    super('f-1 row');
    super.renderChildren(squareCount, Square);
  }
}
// A child square element in a row.
class Square extends App {
  constructor() {
    super('f-1 square');
    // Initial white background color
    this.red = 255;
    this.green = 255;
    this.blue = 255;

    // Set new background color by user choice
    this.colorStyles = {
      0: this.setBlackWhiteColor.bind(this),
      1: this.getRandomColor.bind(this),
      2: this.setColorOnRepeat.bind(this)
    };

    // Set initial background color
    this.changeBackgroundColor(this.setRgbColor());

    // Change background on mouse hover
    this.element.addEventListener(
      'mouseenter',
      this.handleBackgroundChange.bind(this)
    );
  }

  handleBackgroundChange() {
    const colorHandler = this.colorStyles[colorStyle];
    const color = colorHandler();
    this.changeBackgroundColor(color);
  }

  changeBackgroundColor(color) {
    this.element.style.backgroundColor = color;
  }

  setBlackWhiteColor() {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    return this.setRgbColor();
  }

  getRandomColor() {
    this.red = this.getRandomNumber();
    this.green = this.getRandomNumber();
    this.blue = this.getRandomNumber();
    return this.setRgbColor();
  }

  setColorOnRepeat() {
    this.red = Math.floor(this.red * 0.9);
    this.green = Math.floor(this.green * 0.9);
    this.blue = Math.floor(this.blue * 0.9);
    return this.setRgbColor();
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 255);
  }

  setRgbColor() {
    return `rgb(${this.red},${this.green},${this.blue})`;
  }
}

/*
 * Event Handlers
 */

function handleSizeRequest() {
  const answer = requestNewSize();
  // If user click on cancel, end request.
  if (answer === null) return;

  // If the answer is not a valid number, make request again.
  const sizeNumber = Number(answer);
  if (!sizeNumber || sizeNumber < 1 || sizeNumber > 100) {
    alert(`${sizeNumber} is not a valid number. Please try again.`);
    return handleSizeRequest();
  }

  // Update global size variable
  size = sizeNumber;
  createNewTable(size);
}
function handleColorStyleSelection({ target }) {
  colorStyle = target.value;
}
function handleClearTable() {
  createNewTable(size);
}

/*
 * Helpers
 */

function requestNewSize() {
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
