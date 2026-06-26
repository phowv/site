import cl from "./Image.module.css"

interface ImageProps  {
	src: string;
	open: () => void; 
}

const Image = ({ src, open }: ImageProps) => {
	return (
		<div className={cl.imageCard} onClick={open}>
			<img src={src}/>
		</div>
	);
}

export default Image;