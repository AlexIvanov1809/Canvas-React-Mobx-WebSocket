import React from 'react';
import styles from './SettingBar.module.scss';
import toolState from '@src/store/toolState';

const SettingBar = () => {
  return (
    <div className={styles.settingBar}>
      <label htmlFor='line-width'>Толщина линии:</label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        id='line-width'
        type='number'
        min={1}
        max={50}
        defaultValue={1}
      />
      <label htmlFor='stroke-color'>Цвет обводки:</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        id='stroke-color'
        type='color'
      />
    </div>
  );
};

export default SettingBar;
