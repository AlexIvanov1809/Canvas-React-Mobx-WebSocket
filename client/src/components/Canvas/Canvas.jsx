import canvasState from "@src/store/canvasState";
import toolState from "@src/store/toolState";
import { Rect, Brush, Eraser, Circle, Line } from "@src/tools";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Canvas.module.scss";
import axios from "axios";
import ModalMenu from "../ModalMenu/ModalMenu";

export const ENDPOINT = "http://localhost:3000/api/image?id=";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const params = useParams();
  const [modal, setModal] = useState(true);

  const downloadCurrentImage = (data) => {
    const img = new Image();
    const ctx = canvasRef.current.getContext("2d");
    img.src = data;
    img.onload = async () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      ctx.stroke();
    };
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    axios
      .get(ENDPOINT + params.id)
      .then((resp) => {
        downloadCurrentImage(resp.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000");
      canvasState.setSocket(socket);
      canvasState.setSessionid(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log("connect");
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection"
          })
        );
      };
      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} was connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          default:
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.fillColor,
          figure.strokeColor,
          figure.lineWidth
        );
        break;
      case "circle":
        Circle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.r,
          figure.fillColor,
          figure.strokeColor,
          figure.lineWidth
        );
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case "line":
        Line.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.currentX,
          figure.currentY,
          figure.color,
          figure.lineWidth
        );
        break;
      case "undo":
        downloadCurrentImage(figure.img);
        break;
      case "redo":
        downloadCurrentImage(figure.img);
        break;
      case "empty":
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        break;
      case "finish":
        ctx.beginPath();
        break;
      default:
        break;
    }
  };

  const mouseUpHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    axios
      .post(ENDPOINT + params.id, {
        img: canvasRef.current.toDataURL()
      })
      .then((resp) => console.log(resp.data))
      .catch((e) => console.log(e));
  };

  const connectionHandler = (data) => {
    canvasState.setUsername(data);
    setModal(false);
  };
  return (
    <div className={styles.canvas}>
      {modal && <ModalMenu onSubmit={connectionHandler} />}
      <canvas
        onMouseUp={mouseUpHandler}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
