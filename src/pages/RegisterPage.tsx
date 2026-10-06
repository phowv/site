import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthForm from "../components/AuthForm/AuthForm";

const RegisterPage = () => {
	const { register } = useAuth();
	const navigate = useNavigate();

	const [userLogin, setuserLogin] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userDescription, setUserDescription] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async () => {
		await register({
			login: userLogin,
			email: userEmail,
			password: userPassword,
			description: userDescription,
		});
		localStorage.setItem("register_user_login", userLogin);
		setIsLoading(false);
		navigate("/register/verify");
	};

	return (
		<AuthForm
			title="Register page"
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			handler={handleSubmit}
		>
			<div>
				<label>Login</label>
				<Input value={userLogin} onChange={(e) => setuserLogin(e.target.value.trim())} required />
			</div>

			<div>
				<label>Password</label>
				<Input
					type="password"
					value={userPassword}
					onChange={(e) => setUserPassword(e.target.value.trim())}
					disabled={isLoading}
					required
				/>
			</div>

			<div>
				<label>Email</label>
				<Input
					type="email"
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value.trim())}
					disabled={isLoading}
					required
				/>
			</div>

			<div>
				<label>Description (optional)</label>
				<Input
					value={userDescription}
					onChange={(e) => setUserDescription(e.target.value)}
					disabled={isLoading}
				/>
			</div>

			<Button
				disabled={userLogin === "" || userEmail === "" || userPassword === "" || isLoading}
				type="submit"
			>
				Register
			</Button>
		</AuthForm>
	);
};

export default RegisterPage;
