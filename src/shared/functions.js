export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getCurrentDate() {
  return new Date().toLocaleString("ru").replace(',','');
}

export function generateRandomPressValues() {
  let count = 0;
  (function loop() {
    setTimeout(() => {
      console.log("Generating press values: step %o", count);
      count += 1;
      (count < 100) && loop();
    }, 250);
  })();
}

/** Функция добавления информации для пределов */
export function addLimits(array, limits, length) {
  if (!array) return [];

  let result = [...array];
  const props = {
    limit_top: [limits[1], limits[1] + 0.5],
    limit_btm: [0, limits[0]]
  }
  let first = result.findIndex(el => el.x === 0);
  if (first >= 0) {
    result[first] = {...result[first], ...props};
  } else {
    result.unshift({x: 0, ...props})
  }
  result.push({x: length, ...props})

  return result;
}
