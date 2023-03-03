import canvasState from '@src/store/canvasState';
import toolState from '@src/store/toolState';
import Brush from '@src/tools/Brush';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Canvas.module.scss';

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const params = useParams();
  const [modal, setModal] = useState(true);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000');
      socket.onopen = () => {
        console.log('connect');
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connection',
          }),
        );
      };
      socket.onmessage = (e) => {
        console.log(e.data);
      };
    }
  }, [canvasState.username]);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };
  return (
    <div className={styles.canvas}>
      {modal && (
        <div className={styles.modalBack}>
          <div className={styles.modal}>
            <h2>Enter your name</h2>
            <input ref={usernameRef} type='text' />
            <button onClick={connectionHandler}>Enter</button>
          </div>
        </div>
      )}
      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
