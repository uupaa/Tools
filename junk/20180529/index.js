import { VideoController } from "https://uupaa.github.io/Tools/junk/20180529/VideoController.js";
import { save, load } from "https://uupaa.github.io/Tools/junk/20180529/UserSelectSerializer.js";

//import(`https://uupaa.github.io/Tools/junk/20180529/ver1.js?t=${Date.now()}`);

[...document.body.querySelectorAll("video")].forEach(v => {
  if (!v.getAttribute("hacked")) {
    v.removeAttribute("controls");
    v.insertAdjacentHTML("afterend",
      `<div style="font-size: 300%" onclick="hack(this, this.previousElementSibling)">🎃</div>`);
  } else {
    console.log("hacked");
  }
});

window.hack = (jack, video) => {
  jack.remove();
  video.setAttribute("controls", "controls");
  video.insertAdjacentHTML("afterend", `<video-controller></video-controller>`);
  load();
  save();
};

