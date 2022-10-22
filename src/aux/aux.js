export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getCurrentDate() {
  return new Date().toLocaleString("ru").replace(',','');
}

export function getTestData(context) {
  function TestData(psi, power, temp, etime) {
    this.etime = etime;
    this.power = power;
    this.psi = psi;
    this.temp = temp;
  }

  const _bytesToFloats = () => {
    let result = [];
    if (context.rawdata) {
      const data = context.rawdata.slice(0, 2720);
      for(let i = 0; i < data.length; i+=4) {
        let view = new DataView(new ArrayBuffer(4));
        let bytes = data.slice(i, i + 4).reverse();

        bytes.forEach((b, i) => view.setUint8(i, b));
        result.push(view.getFloat32(0));
      }
    }
    return result;
  }
  const _floatsToTestData = (floats) => {
    let result = [];
    for (let i = 0; i < floats.length; i+=4) {
      result.push(
        new TestData(
          floats[i],
          floats[i + 1],
          floats[i + 2],
          floats[i + 3],
        )
      )
    }
    return result;
  }
  const _processRawData = () => {
    const floats = _bytesToFloats();
    if (floats) {
      const testdata = _floatsToTestData(floats.splice(0, 20 * 4));
      const pressure1 = floats.splice(0, 300);
      const pressure2 = floats.splice(0, 300);
      return {
        testdata: testdata,
        pressure1: pressure1,
        pressure2: pressure2
      };
    } else return {};
  }
  return _processRawData();
}