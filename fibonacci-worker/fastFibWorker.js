
const cached = [1, 1
    // 1
    // 1
    // 2
    // 3
    // 5
    // 8

]



function fibonacci(n) {

    self.postMessage({ type: "progress", calculated: cached.length })

    console.log(cached);


    if (cached[n]) {
        return cached[n]
    }







    if (n <= 1) return n;

    return (cached[n] = fibonacci(n - 2) + fibonacci(n - 1));

    //    return fibonacci(n - 1) + fibonacci(n - 2);
}



self.onmessage = function (event) {
    console.time("start")

    fibonacci(event.data)
    self.postMessage({ type: "finished", })

    console.timeEnd("start")

}





