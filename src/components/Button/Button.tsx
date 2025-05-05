import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  bgColor?: string;
  color?: string;
  enabled?: boolean;
}

const StyledButton = styled.button<Omit<ButtonProps, 'children' | 'onClick'>>`
  background-color: ${({ bgColor, enabled }) => enabled ? bgColor : 'darkgrey'};
  color: ${({ color, enabled }) => enabled ? color : 'lightgrey'};
  border: none;
  border-radius: 4px;
  padding: 8px 26px;
  font-size: 1rem;
  cursor: ${({ enabled }) => enabled ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    opacity: ${({ enabled }) => enabled && '0.7'};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children = '',
  onClick,
  bgColor = 'white',
  color = 'black',
  enabled = true
}) => {

  const handleClick = () => {
    enabled && onClick()
  }

  return (
    <StyledButton type="button" onClick={handleClick} bgColor={bgColor} color={color} enabled={enabled}>
        {children}
    </StyledButton>
  );
};