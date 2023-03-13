import React, { useEffect, useState } from "react";
import styles from "./Toolbar.module.scss";
import toolState from "@src/store/toolState";
import canvasState from "@src/store/canvasState";
import { Rect, Brush, Circle, Eraser, Line } from "@src/tools";
import {
  BrushIcon,
  CircleIcon,
  EraserIcon,
  LineIcon,
  RectIcon,
  RedoIcon,
  SaveIcon,
  UndoIcon
} from "@src/assets/icons/";
import cn from "classnames";

const Toolbar = () => {
  const defaultState = {
    brush: false,
    rect: false,
    circle: false,
    eraser: false,
    line: false
  };
  const defaultProps = [
    canvasState.canvas,
    canvasState.socket,
    canvasState.sessionid
  ];
  const [click, setClick] = useState({ ...defaultState, brush: true });

  const changeColor = ({ target }) => {
    toolState.setFillColor(target.value);
    toolState.setStrokeColor(target.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpeg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clickHandle = (tool, toolActive) => {
    toolState.setTool(tool);
    setClick(defaultState);
    setClick((prevState) => ({ ...prevState, [toolActive]: true }));
    console.log(click);
  };

  return (
    <div className={styles.toolbar}>
      <button
        className={cn(styles.toolbar__btn, {
          [styles.active]: click.brush
        })}
        onClick={() =>
          clickHandle(new Brush(...defaultProps, "brush"), "brush")
        }
      >
        <BrushIcon />
      </button>
      <button
        className={cn(styles.toolbar__btn, {
          [styles.active]: click.rect
        })}
        onClick={() => clickHandle(new Rect(...defaultProps), "rect")}
      >
        <RectIcon />
      </button>
      <button
        className={cn(styles.toolbar__btn, {
          [styles.active]: click.circle
        })}
        onClick={() => clickHandle(new Circle(...defaultProps), "circle")}
      >
        <CircleIcon />
      </button>
      <button
        className={cn(styles.toolbar__btn, {
          [styles.active]: click.eraser
        })}
        onClick={() =>
          clickHandle(new Eraser(...defaultProps, "eraser"), "eraser")
        }
      >
        <EraserIcon />
      </button>
      <button
        className={cn(styles.toolbar__btn, {
          [styles.active]: click.line
        })}
        onClick={() => clickHandle(new Line(...defaultProps), "line")}
      >
        <LineIcon />
      </button>
      <input onChange={(e) => changeColor(e)} type="color" />
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          canvasState.undo(canvasState.sessionid, canvasState.socket)
        }
      >
        <UndoIcon />
      </button>
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          canvasState.redo(canvasState.sessionid, canvasState.socket)
        }
      >
        <RedoIcon />
      </button>
      <button className={styles.toolbar__btn} onClick={download}>
        <SaveIcon />
      </button>
    </div>
  );
};

export default Toolbar;
