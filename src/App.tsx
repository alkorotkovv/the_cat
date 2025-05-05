import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Button } from './components/Button/Button';
import { Image } from './components/Image/Image';
import axios from 'axios';
import {
  CONST_DELAY,
  CONST_BASE_URL
} from './utils/constants' 

export const App: React.FC = () => {
 
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const [error, setError] = useState(false)

  useEffect(()  => {
    let interval: number;
    if (isChecked2) interval = window.setInterval(() => getCatImage(), CONST_DELAY);
    return () => clearInterval(interval);
  }, [isChecked2]);

  const getCatImage = async() => {
    setLoading(true);
    axios.get(CONST_BASE_URL + '/v1/images/search')
    .then(res => {
      setImage(res.data[0]);
    })
    .catch(err => {
      setError(true)
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className={styles.app}>
      <div className={styles.checkboxes}>
        <Checkbox
          label="Enable"
          checked={isChecked1}
          disabled={false}
          onChange={() => setIsChecked1(!isChecked1)}
        />
        <Checkbox
          label="Auto-refrash every 5 second"
          checked={isChecked2}
          disabled={false}
          onChange={() => setIsChecked2(!isChecked2)}
        />
      </div>
      <div className={styles.button}>
        <Button
          onClick={getCatImage}
          bgColor='lightgrey'
          color='black'
          enabled={isChecked1}
        >
          Get Cat
        </Button>
      </div>
      <div className={styles.content}>
      {
        loading
        ? <p>Загрузка изображения...</p>
        : error
          ? <p>Ошибка загрузки данных</p>
          : <Image image={image} />
      }
      </div>
    </div>
  );
};

