import type React from "react";
import cl from "./Image.module.css";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	open: () => void;
	containerStyle?: React.CSSProperties;
}

const Image = ({ src, open, containerStyle, ...props }: ImageProps) => {
	return (
		<div className={cl.imageCard} onClick={open} style={containerStyle}>
			<img src={src} {...props} />
		</div>
	);
};

export default Image;
