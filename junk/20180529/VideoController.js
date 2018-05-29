const VIDEO_CONTROLLER_TEMPLATE = `
<style>
  .container { display: flex; user-select: none; outline: solid blue 1px; font-size: 9pt; }
  .play   { outline: 1px solid gray; width: 100px; height: 3em; text-align: center }
  .m10    { outline: 1px solid gray; width: 50px; height: 3em; text-align: center }
  .m01    { outline: 1px solid gray; width: 50px; height: 3em; text-align: center }
  .p01    { outline: 1px solid gray; width: 50px; height: 3em; text-align: center }
  .p10    { outline: 1px solid gray; width: 50px; height: 3em; text-align: center }
  .zoom   { outline: 1px solid gray; width: 50px; height: 3em; text-align: center }
  .reduce { outline: 1px solid gray; width: 50px; height: 3em; text-align: center }
  .x01    { outline: 1px solid gray; width: 30px; height: 3em; text-align: center }
  .x10    { outline: 1px solid gray; width: 30px; height: 3em; text-align: center }
  .x20    { outline: 1px solid gray; width: 30px; height: 3em; text-align: center }
  .x50    { outline: 1px solid gray; width: 30px; height: 3em; text-align: center }
</style>
<div class="container">
  <div class="play">▶️/⏸ <br><span class="time">0/0</span></div>
  <div class="m10">◀️◀️<br>-1.0</div>
  <div class="m01">◀️<br>-0.1</div>
  <div class="p01">▶️<br>+0.1</div>
  <div class="p10">▶️▶️<br>+1.0</div>
  <div class="zoom">zoom</div>
  <div class="reduce">reduce</div>
  <div class="x01">x.1</div>
  <div class="x10">x1</div>
  <div class="x20">x2</div>
  <div class="x50">x5</div>
</div>
`;

export class VideoController extends HTMLElement {
  static get tag() { return "video-controller"; }
  constructor() {
    super();
    this._video = null;
  }
  connectedCallback() {
    const video = this.previousElementSibling;
    if (video && video.nodeName === "VIDEO") {
      video.setAttribute("hacked", "YES");
      this._video = video;
      this._shadowRoot = this.attachShadow({ mode: "open" }); // { mode, host, innerHTML }
      this._shadowRoot.innerHTML = VIDEO_CONTROLLER_TEMPLATE;

      this.attachHandler();
      this.update();

      video.ontimeupdate = () => { this.update(); }
      this.zoom(4);
    }
  }
  disconnectedCallback() { }
  attributeChangedCallback(/*attributeName, oldValue, newValue, namespace */) { }
  adoptedCallback() { }
  attachHandler() {
    const v = this._video;
    this._shadowRoot.querySelector(".play").onclick   = () => { v.paused ? v.play() : v.pause(); };
    this._shadowRoot.querySelector(".m10").onclick    = () => { v.currentTime -= 1.0; }
    this._shadowRoot.querySelector(".m01").onclick    = () => { v.currentTime -= 0.1; }
    this._shadowRoot.querySelector(".p01").onclick    = () => { v.currentTime += 0.1; }
    this._shadowRoot.querySelector(".p10").onclick    = () => { v.currentTime += 1.0; }
    this._shadowRoot.querySelector(".zoom").onclick   = () => { this.zoom(); }
    this._shadowRoot.querySelector(".reduce").onclick = () => { this.reduce(); }
    this._shadowRoot.querySelector(".x01").onclick    = () => { v.playbackRate = 0.1; }
    this._shadowRoot.querySelector(".x10").onclick    = () => { v.playbackRate = 1.0; }
    this._shadowRoot.querySelector(".x20").onclick    = () => { v.playbackRate = 2.0; }
    this._shadowRoot.querySelector(".x50").onclick    = () => { v.playbackRate = 5.0; }
  }
  update() {
    const v = this._video;
    if (v && v.duration) {
      this._shadowRoot.querySelector(".time").textContent =
          `${v.currentTime.toFixed(1)}/${v.duration.toFixed(1)}`;
    }
  }
  zoom(n = 1.5) {
    const obj = getComputedStyle(this._video);
    const width = parseFloat(obj.width);
    const height = parseFloat(obj.height);
    this._video.attributeStyleMap.set("width",  CSS.px(width  * n));
    this._video.attributeStyleMap.set("height", CSS.px(height * n));
  }
  reduce(n = 1.5) {
    const obj = getComputedStyle(this._video);
    const width = parseFloat(obj.width);
    const height = parseFloat(obj.height);
    this._video.attributeStyleMap.set("width",  CSS.px(width  / n));
    this._video.attributeStyleMap.set("height", CSS.px(height / n));
  }
}

customElements.define(VideoController.tag, VideoController);

