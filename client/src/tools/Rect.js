import Tool from "./Tool";

export default class Rect extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
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
          type: "rect",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          fillColor: this.ctx.fillStyle,
          strokeColor: this.ctx.strokeStyle,
          lineWidth: this.ctx.lineWidth
        }
      })
    );
  }
  mouseDownHandler(e) {
    this.onmouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.onmouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx, x, y, w, h, fillColor, strokeColor, lineWidth) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }
}
