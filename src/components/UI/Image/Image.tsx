import type React from "react";

interface ImageProps  {
	title: string;
	description: string;
	ownerLogin: string;
	src: string;
	width: string;
	style?: React.CSSProperties;
}

const Image = ({ title, description, ownerLogin, src, width, style}: ImageProps) => {
	return (
		<div style={style}>
			<h2>{title}</h2>
			<p>{description}</p>
			<p>Owner: {ownerLogin}</p>
			<img src={src} width={width}/>
		</div>
	);
}

export default Image;