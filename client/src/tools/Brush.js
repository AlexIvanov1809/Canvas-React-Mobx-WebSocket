import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas, socket, id, type) {
    super(canvas, socket, id);
    this.type = type || "brush";
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.onmouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish"
        }
      })
    );
  }
  mouseDownHandler(e) {
    this.onmouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }
  mouseMoveHandler(e) {
    if (this.onmouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: this.type,
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            lineWidth: this.ctx.lineWidth,
            color: this.ctx.strokeStyle
          }
        })
      );
    }
  }

  static draw(ctx, x, y, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
