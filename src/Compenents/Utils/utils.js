export function disableAllButtons(disabled) {
  document.getElementById("rangeSlider").disabled = disabled;
  document
    .querySelectorAll(".btn")
    .forEach((button) => (button.disabled = disabled));
}

export async function sleep(milliseconds) {
  if (milliseconds === 0) return;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milliseconds);
  });
}

export var delay = 10;

export function changeDelay(delayValue) {
  delay = delayValue;
}
