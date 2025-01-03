const worker = new Worker("fibworker.js");
const fastWorker = new Worker("fastFibonacciWorker.js");

const numberInput = document.getElementById("inputNumber");
const fastNumberInput = document.getElementById("fastInputNumber");
const progressbarEl = document.getElementById("progressbar");
const fastProgressbarEl = document.getElementById("fast-progressbar");
const subProgressbarEl = document.getElementById("sub-progressbar");
const countSpan = document.getElementById("count");
const fastCountSpan = document.getElementById("fastCount");
const subCountSpan = document.getElementById("sub-count");

const calcFib = () => {
  console.log(numberInput.value);

  worker.postMessage(numberInput.value);
};

const fastCalcFib = () => {
  console.log(fastNumberInput);

  fastWorker.postMessage(fastNumberInput.value);
};

worker.onmessage = function (event) {
  //  console.log("[script.js]", event.data);

  if (event.data.type === "progress") {
    countSpan.innerHTML = event.data.calculated;
    progressbarEl.value = (event.data.calculated / numberInput.value) * 1;
    //self.postMessage({ type: "progress", calculated: n - 1 })
  }
  if (event.data.type === "sub-progress") {
    subCountSpan.innerHTML = event.data.calculating;
    subProgressbarEl.value = event.data.calculating;
    //self.postMessage({ type: "progress", calculated: n - 1 })
  }
  if (event.data.type === "execution") {
    updateTable(event.data.pattern);
  }
  if (event.data.type === "finished") {
    countSpan.innerHTML = "done";
    progressbarEl.value = 100;

    subCountSpan.innerHTML = "done!";
    subProgressbarEl.value = 100;
  }
};
fastWorker.onmessage = function (event) {
  if (event.data.type === "progress") {
    fastCountSpan.innerHTML = event.data.calculated;
    fastProgressbarEl.value = (event.data.calculated / numberInput.value) * 1;
  }

  if (event.data.type === "finished") {
    fastCountSpan.innerHTML = "done";
    fastProgressbarEl.value = 100;
  }
};

const updateTable = (pattern) => {
  // Get the table container or create a new table
  const tableContainer = document.getElementById("table-container");

  // Clear previous table data if it exists
  tableContainer.innerHTML = "";

  // Create a new table
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  // Add table header
  const headerRow = document.createElement("tr");
  const headers = ["Key", "Value"];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    th.style.border = "1px solid black";
    th.style.padding = "8px";
    th.style.backgroundColor = "#f2f2f2";
    table.appendChild(headerRow);
    headerRow.appendChild(th);
  });

  // Add table rows for pattern data
  Object.entries(pattern).forEach(([key, value]) => {
    const row = document.createElement("tr");

    // Create cells for key and value
    const keyCell = document.createElement("td");
    keyCell.innerText = key;
    keyCell.style.border = "1px solid black";
    keyCell.style.padding = "8px";
    keyCell.style.textAlign = "center";

    const valueCell = document.createElement("td");
    valueCell.innerText = value;
    valueCell.style.border = "1px solid black";
    valueCell.style.padding = "8px";
    valueCell.style.textAlign = "center";

    // Append cells to row and row to table
    row.style.backgroundColor = "pink";
    if (key === "10") {
      console.log(pattern, key, +pattern[+key + 2], value);
    }

    if (+pattern[+key + 1] + pattern[+key + 2] === +value) {
      row.style.backgroundColor = "green";
    }
    row.appendChild(keyCell);
    row.appendChild(valueCell);
    table.appendChild(row);
  });

  // Append the table to the container
  tableContainer.appendChild(table);
};

// Example usage
const pattern = {
  0: 89,
  1: 144,
  2: 89,
  3: 55,
  4: 34,
  5: 21,
  6: 13,
  7: 8,
  8: 5,
  9: 3,
  10: 2,
  11: 1,
  12: 1,
};
updateTable(pattern);

const stopHandler = () => {
  worker.postMessage("stop");
};
