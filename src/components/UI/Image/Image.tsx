import type React from "react";
import cl from "./Image.module.css";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	open: () => void;
}

const Image = ({ src, open, ...props }: ImageProps) => {
	return (
		<div className={cl.imageCard} onClick={open}>
			<img src={src} {...props} />
		</div>
	);
};

export default Image;
