import { VideoController } from "https://uupaa.github.io/Tools/junk/20180529/VideoController.js";
//import { VideoController } from "./VideoController.js";

[...document.body.querySelectorAll("video")].forEach(v => {
  v.insertAdjacentHTML("afterend", `<video-controller></video-controller>`);
});
