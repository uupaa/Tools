import { VideoController } from "https://uupaa.github.io/Tools/junk/20180529/VideoController.js";
import { save, load } from "https://uupaa.github.io/Tools/junk/20180529/UserSelectSerializer.js";

[...document.body.querySelectorAll("video")].forEach(v => {
  if (!v.effected) {
    v.insertAdjacentHTML("afterend",
      `<div style="font-size: 300%" onclick="hack(this, this.previousElementSibling)">🎃</div>`);
  } else {
    console.log("effected");
  }
});

window.hack = (jack, video) => {
  jack.remove();
  video.insertAdjacentHTML("afterend", `<video-controller></video-controller>`);
  load();
  save();
};

