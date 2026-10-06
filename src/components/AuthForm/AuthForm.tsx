import React, { useState, type SyntheticEvent } from "react";
import cl from "./AuthForm.module.css";

type AuthFormProps = {
	title: string;
	isLoading: boolean;
	setIsLoading: (l: boolean) => void;
	handler: () => Promise<void>;
	children: React.ReactNode;
};

const AuthForm = (props: AuthFormProps) => {
	const [error, setError] = useState("");

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		props.setIsLoading(true);
		setError("");

		try {
			await props.handler();
		} catch (e: any) {
			props.setIsLoading(false);
			setError(e instanceof Error ? e.message : "Unknown error");
		}
	};

	return (
		<div className={cl.container}>
			<h1>{props.title}</h1>

			{error && <p style={{ color: "red" }}>{error}</p>}
			{props.isLoading && <p>Loadind...</p>}

			<form onSubmit={handleSubmit}>{props.children}</form>
		</div>
	);
};

export default AuthForm;
