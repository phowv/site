import React, { useState } from "react";
import cl from "./Dropzone.module.css";

interface DropzoneProps extends React.BaseHTMLAttributes<HTMLDivElement> {
	onDrop: React.DragEventHandler<HTMLDivElement>;
	children: React.ReactNode;
}

const Dropzone = ({ onDrop, children, ...props }: DropzoneProps) => {
	const [isDragging, setIsDragging] = useState(false);

	const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
		setIsDragging(true);
	};

	const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const onDropHandler: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setIsDragging(false);
		onDrop(e);
	};

	return (
		<div
			role="button"
			onDrop={onDropHandler}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			className={cl.dropzone}
			style={{ background: isDragging ? "#f0f8ff" : "transparent" }}
			{...props}
		>
			{children}
		</div>
	);
};

export default Dropzone;
