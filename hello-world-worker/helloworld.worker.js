
let intVal

self.onmessage = function (event) {
    console.log("[helloworld.worker.js]", event.data);

    if (event.data === "stop") {
        clearInterval(intVal)
        self.close()
    }

}






intVal = setInterval(() => {

    self.postMessage("hello from worker ")
}, 500);

