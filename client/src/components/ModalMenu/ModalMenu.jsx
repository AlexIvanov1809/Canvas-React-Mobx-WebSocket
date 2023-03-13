import React, { useRef } from "react";
import styles from "./ModalMenu.module.scss";

const ModalMenu = ({ onSubmit }) => {
  const usernameRef = useRef();

  const connectionHandler = () => {
    onSubmit(usernameRef.current.value);
  };
  return (
    <div className={styles.modalBack}>
      <div className={styles.modal}>
        <h2>Enter your name</h2>
        <input ref={usernameRef} type="text" />
        <button onClick={connectionHandler}>Enter</button>
      </div>
    </div>
  );
};

export default ModalMenu;
