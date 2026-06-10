import type React from "react";

const Image = ({ title, description, src, width, style}: { title: string, description: string, src: string, width: string, style?: React.CSSProperties }) => {
	return (
		<div style={style}>
			<h2>{title}</h2>
			<p>{description}</p>
			<img src={src} width={width}/>
		</div>
	);
}

export default Image;