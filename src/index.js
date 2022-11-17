"use strict";

let input = document.getElementById("input");
let time = document.getElementById("time");
const form = document.getElementById("form");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let allSeconds = 0;

const format = (seconds) => {
  let s = (seconds % 60).toString();
  let m = Math.floor((seconds / 60) % 60).toString();
  let h = Math.floor((seconds / 60 / 60) % 60).toString();
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:${s.padStart(2, "0")}`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
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
      } else {
        --allSeconds;
        time.textContent = format(allSeconds);
        input.value = time.textContent;
      }
    }, 1000);
    stop.addEventListener("click", () => {
      clearInterval(upd);
    });
    reset.addEventListener("click", () => {
      clearInterval(upd);
      input.value = "";
      time.textContent = "00:00:00";
    });
  } else {
    alert("Заполните время!");
  }
});
