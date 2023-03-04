import React from 'react';
import styles from './Toolbar.module.scss';
import cn from 'classnames';
import toolState from '@src/store/toolState';
import canvasState from '@src/store/canvasState';
import { Rect, Brush, Circle, Eraser, Line } from '@src/tools';

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
        className={cn(styles.toolbar__btn, styles.brush)}
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      ></button>
      <button
        className={cn(styles.toolbar__btn, styles.rect)}
        onClick={() =>
          toolState.setTool(
            new Rect(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid,
            ),
          )
        }
      ></button>
      <button
        className={cn(styles.toolbar__btn, styles.circle)}
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      ></button>
      <button
        className={cn(styles.toolbar__btn, styles.eraser)}
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      ></button>
      <button
        className={cn(styles.toolbar__btn, styles.line)}
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></button>
      <input onChange={(e) => changeColor(e)} type='color' />
      <button
        className={cn(styles.toolbar__btn, styles.undo)}
        onClick={() => canvasState.undo()}
      ></button>
      <button
        className={cn(styles.toolbar__btn, styles.redo)}
        onClick={() => canvasState.redo()}
      ></button>
      <button
        className={cn(styles.toolbar__btn, styles.save)}
        onClick={download}
      ></button>
    </div>
  );
};

export default Toolbar;
