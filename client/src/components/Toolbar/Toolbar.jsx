import React from 'react';
import styles from './Toolbar.module.scss';
import cn from 'classnames';
import toolState from '@src/store/toolState';
import Brush from '@src/tools/Brush';
import canvasState from '@src/store/canvasState';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <button
        className={cn(styles.toolbar__btn, styles.brush)}
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      ></button>
      <button className={cn(styles.toolbar__btn, styles.rect)}></button>
      <button className={cn(styles.toolbar__btn, styles.circle)}></button>
      <button className={cn(styles.toolbar__btn, styles.eraser)}></button>
      <button className={cn(styles.toolbar__btn, styles.line)}></button>
      <input type='color' />
      <button className={cn(styles.toolbar__btn, styles.undo)}></button>
      <button className={cn(styles.toolbar__btn, styles.redo)}></button>
      <button className={cn(styles.toolbar__btn, styles.save)}></button>
    </div>
  );
};

export default Toolbar;
