self.onmessage = function (event) {
  const { originalImage, preset } = event.data;
  const { width, height, data } = originalImage;

  let arr = imageProcessor(data, preset);

  const modifiedImage = new ImageData(arr, width, height);
  self.postMessage(modifiedImage);
};

function randomColor() {
  return Math.floor(255 * Math.random());
}

function imageProcessor(data, preset) {
  const arr = new Uint8ClampedArray(data.length);
  for (let i = 0; i < arr.length; i += 4) {
    let { r, g, b } = getColor(
      { r: data[i], g: data[i + 1], b: data[i + 2] },
      preset
    );

    arr[i + 0] = r;
    arr[i + 1] = g;
    arr[i + 2] = b;
    arr[i + 3] = 255;
  }

  return arr;
}

const getColor = (color, preset) => {
  switch (preset) {
    case "red":
      return { r: 255, g: color.g, b: color.b };
    case "green":
      return { r: color.r, g: 255, b: color.b };
    case "blue":
      return { r: color.r, g: color.g, b: 255 };
    case "gray":
      let avarage = (color.r + color.b + color.g) / 3



      return { r: Math.abs(avarage), g: Math.abs(avarage), b: Math.abs(avarage) };
    case "invert":

      return { r: Math.abs(avarage), g: Math.abs(avarage), b: Math.abs(avarage) };
    case "r-g":

      return { r: color.g, g: color.r, b: color.b };

    case "bright":


      return { r: Math.min(255, color.r + 100), g: Math.min(255, color.g + 100), b: Math.min(255, color.b + 100) };


    case "brighter":


      return { r: Math.min(255, color.r + 200), g: Math.min(255, color.g + 200), b: Math.min(255, color.b + 200) };

    case "dark":


      return { r: Math.min(255, color.r - 100), g: Math.min(255, color.g - 100), b: Math.min(255, color.b - 100) };


    case "darker":


      return { r: Math.min(255, color.r - 200), g: Math.min(255, color.g - 200), b: Math.min(255, color.b - 200) };



    default:
      return { r: color.r, g: color.g, b: color.b };
  }
};
