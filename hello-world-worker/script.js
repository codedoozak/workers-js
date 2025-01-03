console.log("hello");

const worker = new Worker("helloworld.worker.js");


worker.onmessage = function (event) {
    console.log("[script.js]", event.data);

}



worker.postMessage("hello from script")



const stopHandler = () => {
    worker.postMessage("stop")

}