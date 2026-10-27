import React from 'react';
import cl from './Container.module.css'

const Container = (props: React.ButtonHTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} className={`${cl.container} ${props.className ?? ""}`.trim()}/>
	);
}

export default Container;
