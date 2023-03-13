import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socket, id, type) {
    super(canvas, socket, id, type);
  }

  static draw(ctx, x, y, lineWidth) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
