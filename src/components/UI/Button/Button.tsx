import React from 'react';
import classes from'./Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	children: React.ReactNode;
}

const Button = ({ children, isActive, ...props }: ButtonProps) => {
	return (
    <button {...props} className={ isActive ? `${classes.button} ${classes.active}` : classes.button }>{ children }</button>
  )
}

export default Button;
