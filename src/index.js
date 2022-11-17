"use strict";

let input = document.getElementById("input");
let time = document.getElementById("time");
const form = document.getElementById("form");
const reset = document.getElementById("reset");
const start = document.getElementById("start");

reset.disabled = true;

let allSeconds = 0;

const format = (s) => {
  let seconds = (s % 60).toString();
  let minutes = Math.floor((s / 60) % 60).toString();
  let hours = Math.floor((s / 60 / 60) % 60).toString();
  return `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    start.disabled = true;
    reset.disabled = false;
    let arr = input.value.split(":");
    let hours = arr[0];
    let minutes = arr[1];
    let seconds = arr[2];
    allSeconds = +hours * 3600 + +minutes * 60 + +seconds;
    time.textContent = format(allSeconds);
    const upd = setInterval(() => {
      if (allSeconds < 1) {
        clearInterval(upd);
        time.textContent = "Время вышло!";
        reset.disabled = true;
        start.disabled = false;
      } else {
        start.disabled = true;
        --allSeconds;
        time.textContent = format(allSeconds);
        input.value = time.textContent;
      }
    }, 1000);
    reset.addEventListener("click", () => {
      clearInterval(upd);
      input.value = "";
      time.textContent = "00:00:00";
      start.disabled = false;
      reset.disabled = true;
    });
  } else {
    alert("Заполните время!");
  }
});
