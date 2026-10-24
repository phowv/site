import React from "react";
import classes from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button {...props} className={`${classes.button} ${className}`}>
			{children}
		</button>
	);
};

export default Button;
