/** Функция парсинга массива байт из БД в структуру данных об испытании */
export function getTestData(context) {
  function TestData(psi, power, temp, etime) {
    this.etime = etime;
    this.power = power;
    this.psi = psi;
    this.temp = temp;
  }

  const _processRawData = () => {
    const floats = _bytesToFloats();
    if (floats) {
      return (floats) ? {
        testdata: _floatsToTestData(floats.splice(0, 20 * 4)),
        press_top: floats.splice(0, 300),
        press_btm: floats.splice(0, 300)
      } : {}
    };
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

  return _processRawData();
}

  /** Функция создания массива точек для графика
   * давления диафрагмы из данных испытания */
export function createPressPoints(array, length, limits) {
    let result = [];
    if (array?.length && length > 0) {
      array.length = length;
      array.map(v => v > 0 ? v * 0.070307 : 0)
        .forEach((item, index) => {
          result.push({
            x: index, y: item,
            limit_btm: [0, limits[0]],
            limit_top: [limits[1], limits[1] + 0.5]})
      });
    }

    return result;
  };