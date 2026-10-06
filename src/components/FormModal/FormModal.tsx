import React from "react";
import cl from "./FormModal.module.css";

interface FormModalProps {
	children: React.ReactNode;
	visible: boolean;
	close: () => void;
	next?: () => void;
	prev?: () => void;
}

const FormModal = ({ children, visible, close, next, prev }: FormModalProps) => {
	const rootClasses = [cl.formModal];
	if (visible) {
		rootClasses.push(cl.active);
	}

	return (
		<div className={rootClasses.join(" ")} onClick={() => close()}>
			{prev && (
				<button
					className={cl.formModalArrowButton}
					style={{ left: 0 }}
					onClick={(e) => {
						e.stopPropagation();
						prev();
					}}
				>
					{"<"}
				</button>
			)}

			{next && (
				<button
					className={cl.formModalArrowButton}
					style={{ right: 0 }}
					onClick={(e) => {
						e.stopPropagation();
						next();
					}}
				>
					{">"}
				</button>
			)}

			<div className={cl.formModalContent} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default FormModal;
