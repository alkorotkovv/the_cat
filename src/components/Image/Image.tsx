import React from 'react';
import styles from './Image.module.css';
import {IImage} from '../../types/app';

type Props = {
  image: IImage
}

export const Image: React.FC<Props> = ({
  image 
}) => {

  return (
    <div className={styles.container}>
      {
        image.url && <img src={image.url} width={image.width} height={image.height} alt="Random cat"/>
      }
    </div>
  );
};
    