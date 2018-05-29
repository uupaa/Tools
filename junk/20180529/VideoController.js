const VIDEO_CONTROLLER_TEMPLATE = `
<style>
  .container { display: flex; user-select: none; outline: solid blue 1px; }
  .time   { mergin: 0 5px; width: 100px; height: 2em; text-align: center }
  .play   { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .r10    { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .r1     { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .f1     { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .f10    { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .zoom   { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .reduce { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .x01    { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .x10    { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .x20    { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
  .x50    { outline: 1px solid gray; width: 70px; height: 3em; text-align: center }
</style>
<div class="container">
  <div class="play"⏯</div>
  <div class="time">0 / 0</div>
  <div class="r10">⏪(-1.0)</div>
  <div class="r10">◀️(-0.1)</div>
  <div class="f10">▶️(+0.1)</div>
  <div class="f10">⏩(+1.0)</div>
  <div class="zoom">zoom</div>
  <div class="reduce">reduce</div>
  <div class="x01">x.1</div>
  <div class="x10">x1</div>
  <div class="x20">x2</div>
  <div class="x50">x5</div>
</div>
`;

export class VideoController extends HTMLElement {
  static get tag() { return "<video-controller>"; }
  constructor() {
    super();
    this._video = null;
  }
  connectedCallback() {
    const video = this.previousElementSibling;
    if (video && video.nodeName === "VIDEO") {
      this._video = video;
      this._shadowRoot = this.attachShadow({ mode: "open" }); // { mode, host, innerHTML }
      this._shadowRoot.innerHTML = VIDEO_CONTROLLER_TEMPLATE;

      this.attachHandler();
      this.update();

      video.ontimeupdate = () => { this.update(); }
    }
  }
  disconnectedCallback() { }
  attributeChangedCallback(/*attributeName, oldValue, newValue, namespace */) { }
  adoptedCallback() { }
  attachHandler() {
    const v = this._video;
    this._shadowRoot.querySelector(".play").onclick   = () => { v.paused ? v.play() : v.pause(); };
    this._shadowRoot.querySelector(".r10").onclick    = () => { v.currentTime -= 1.0; }
    this._shadowRoot.querySelector(".r01").onclick    = () => { v.currentTime -= 0.1; }
    this._shadowRoot.querySelector(".f01").onclick    = () => { v.currentTime += 0.1; }
    this._shadowRoot.querySelector(".f10").onclick    = () => { v.currentTime += 1.0; }
    this._shadowRoot.querySelector(".zoom").onclick   = () => { v.width *= 1.5; v.height *= 1.5; }
    this._shadowRoot.querySelector(".reduce").onclick = () => { v.width /= 1.5; v.height /= 1.5; }
    this._shadowRoot.querySelector(".x01").onclick    = () => { v.playbackRate = 0.1; }
    this._shadowRoot.querySelector(".x10").onclick    = () => { v.playbackRate = 1.0; }
    this._shadowRoot.querySelector(".x20").onclick    = () => { v.playbackRate = 2.0; }
    this._shadowRoot.querySelector(".x50").onclick    = () => { v.playbackRate = 5.0; }
  }
  update() {
    const v = this._video;
    this._shadowRoot.querySelector(".time").textContent =
        `${v.currentTime.toFixed(1)} / ${v.duration.toFixed(1)}`;
  }
}

customElements.define(VideoController.tag, VideoController);
