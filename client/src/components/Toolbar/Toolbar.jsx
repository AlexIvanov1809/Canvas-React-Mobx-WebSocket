import React from 'react';
import styles from './Toolbar.module.scss';
import toolState from '@src/store/toolState';
import canvasState from '@src/store/canvasState';
import { Rect, Brush, Circle, Eraser, Line } from '@src/tools';
import {
  BrushIcon,
  CircleIcon,
  EraserIcon,
  LineIcon,
  RectIcon,
  RedoIcon,
  SaveIcon,
  UndoIcon,
} from '@src/assets/icons/';

const Toolbar = () => {
  const changeColor = ({ target }) => {
    toolState.setFillColor(target.value);
    toolState.setStrokeColor(target.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionid + '.jpeg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
              'brush',
            ),
          )
        }
      >
        <BrushIcon />
      </button>
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      >
        <RectIcon />
      </button>
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          toolState.setTool(
            new Circle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      >
        <CircleIcon />
      </button>
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          toolState.setTool(
            new Eraser(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
              'eraser',
            ),
          )
        }
      >
        <EraserIcon />
      </button>
      <button
        className={styles.toolbar__btn}
        onClick={() =>
          toolState.setTool(
            new Line(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      >
        <LineIcon />
      </button>
      <input onChange={(e) => changeColor(e)} type='color' />
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
