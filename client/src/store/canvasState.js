import { ENDPOINT } from "@src/components/Canvas/Canvas";
import axios from "axios";
import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  socket = null;
  sessionid = null;
  undoList = [];
  redoList = [];
  username = "";
  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username) {
    this.username = username;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setSessionid(sessionid) {
    this.sessionid = sessionid;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo(id, socket) {
    let ctx = this.canvas.getContext("2d");
    console.log(`redo: ${this.redoList.length}, undo: ${this.undoList.length}`);
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;

      img.onload = async () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
      socket.send(
        JSON.stringify({
          method: "draw",
          id,
          figure: {
            type: "undo",
            img: dataUrl
          }
        })
      );
      axios
        .post(ENDPOINT + id, {
          img: dataUrl
        })
        .then((resp) => console.log(resp.data));
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      socket.send(
        JSON.stringify({
          method: "draw",
          id,
          figure: {
            type: "empty"
          }
        })
      );
    }
  }

  redo(id, socket) {
    let ctx = this.canvas.getContext("2d");
    console.log(`redo: ${this.redoList.length}, undo: ${this.undoList.length}`);
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;

      img.onload = async () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
      socket.send(
        JSON.stringify({
          method: "draw",
          id,
          figure: {
            type: "redo",
            img: dataUrl
          }
        })
      );
      axios
        .post(ENDPOINT + id, {
          img: dataUrl
        })
        .then((resp) => console.log(resp.data));
    }
  }
}

export default new CanvasState();
