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