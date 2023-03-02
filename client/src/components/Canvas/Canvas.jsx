import canvasState from '@src/store/canvasState';
import toolState from '@src/store/toolState';
import Brush from '@src/tools/Brush';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import styles from './Canvas.module.scss';

const Canvas = observer(() => {
  const canvasRef = useRef();
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);
  return (
    <div className={styles.canvas}>
      <canvas ref={canvasRef} width={600} height={400} />
    </div>
  );
});

export default Canvas;
