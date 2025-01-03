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

const stopHandler = () => {
  worker.postMessage("stop");
};
