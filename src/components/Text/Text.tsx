import React from 'react';
import styles from './Text.module.css'
import cn from 'classnames'

interface IText {
  text?: string;
  type?: string;
}

export const Text: React.FC<IText> = ({
    text = '',
    type = 'default'
}) => {

  return (
    <p className={cn(styles.text, type === 'error' && styles.text_error, type === 'loading' && styles.text_loading)}>{text}</p>
  );
};