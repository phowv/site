import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import { verifyUser } from "../lib/api/authApi";
import AuthForm from "../components/AuthForm/AuthForm";

const VerificaticationPage = () => {
	const [code, setCode] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async () => {
		const userLogin = localStorage.getItem("register_user_login");
		if (userLogin === null) {
			throw new Error("registration user not found");
		}

		await verifyUser({ login: userLogin, code: code });
		navigate("/login");
	};

	return (
		<AuthForm
			title="Verification page"
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			handler={handleSubmit}
		>
			<div>
				<label>Verification code</label>
				<Input
					value={code}
					onChange={(e) => setCode(e.target.value.trim())}
					disabled={isLoading}
					required
				/>
			</div>

			<Button disabled={code === "" || isLoading} type="submit">
				Verify
			</Button>
		</AuthForm>
	);
};

export default VerificaticationPage;
