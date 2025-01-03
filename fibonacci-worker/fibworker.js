const executionPattern = {};

function fibonacci(n) {
  executionPattern[n] = executionPattern[n] ? +executionPattern[n] + 1 : 1;
  //console.log(executionPattern);

  self.postMessage({ type: "progress", calculated: 1 });
  self.postMessage({ type: "sub-progress", calculating: n });
  self.postMessage({ type: "execution", pattern: executionPattern });

  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = function (event) {
  console.time("start");
  const result = fibonacci(event.data);
  console.log("executionPattern", executionPattern);
  console.log("result", result);

  self.postMessage({ type: "finished" });

  console.timeEnd("start");
};
