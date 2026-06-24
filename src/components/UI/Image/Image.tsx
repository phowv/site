import type React from "react";
import Button from "../Button/Button";

interface ImageProps  {
	title: string;
	description: string;
	ownerLogin: string;
	src: string;
	width: string;
	style?: React.CSSProperties;
	open: () => void; 
}

const Image = ({ title, description, ownerLogin, src, width, style, open }: ImageProps) => {
	return (
		<div style={style}>
			<h2>{title}</h2>
			<p>{description}</p>
			<p>Owner: {ownerLogin}</p>
			<img src={src} width={width}/>
			<Button onClick={open}>Open</Button>
		</div>
	);
}

export default Image;