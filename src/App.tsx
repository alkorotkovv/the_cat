import React, { useState } from 'react';
import styles from './App.module.css';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Button } from './components/Button/Button';
import { Image } from './components/Image/Image';
import { Text } from './components/Text/Text';
import axios from 'axios';
import {
  CONST_DELAY,
  CONST_BASE_URL
} from './utils/constants';
import {useUpdateEffect} from './hooks/useUpdateEffect';
import {IImage} from './types/app';

export const App: React.FC = () => {
 
  const [isChecked1, setIsChecked1] = useState<boolean>(true);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<IImage>({});
  const [error, setError] = useState<boolean>(false)

  useUpdateEffect(()  => {
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
      <section className={styles.checkboxes}>
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
      </section>
      <section className={styles.button}>
        <Button
          onClick={getCatImage}
          bgColor='#2196f3'
          color='white'
          enabled={isChecked1}
        >
          Get Cat
        </Button>
      </section>
      <section className={styles.content}>
      {
        loading
        ? <Text text='Загрузка изображения...' type='loading'/>
        : error
          ? <Text text='Ошибка загрузки данных' type='error'/>
          : <Image image={image}/>
      }
      </section>
    </div>
  );
};

