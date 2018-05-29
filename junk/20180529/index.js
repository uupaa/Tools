import { hack } from "https://uupaa.github.io/Tools/junk/20180529/hack.js";

[...document.body.querySelectorAll("video")].forEach(v => {
  v.insertAdjacentHTML("afterend", `<div style="font-size:x-large" onclick="hack(this, this.previousElementSibling)">🎃</div>`);
});
