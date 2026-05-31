const Image = ({ title, description, src, width}: { title: string, description: string, src: string, width: string }) => {
	return (
		<>
			<h2>{title}</h2>
			<p>{description}</p>
			<img src={src} width={width}/>
		</>
	);
}

export default Image;