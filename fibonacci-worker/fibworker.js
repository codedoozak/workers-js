
const arr = new Set();


function fibonacci(n) {
    arr.add(n)

    const z = Array.from(arr).sort(function (a, b) { return b - a });


    console.log(z);


    self.postMessage({ type: "progress", calculated: z[0] - 1 })
    self.postMessage({ type: "sub-progress", calculating: n })




    if (n <= 1) return n;

    // Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2);
}



self.onmessage = function (event) {
    console.time("start")

    fibonacci(event.data)
    self.postMessage({ type: "finished" })

    console.timeEnd("start")

}





