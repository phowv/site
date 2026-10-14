import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import AuthForm from "../components/AuthForm/AuthForm";

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [userLogin, setuserLogin] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async () => {
		await login({ login: userLogin, password: userPassword });
		setIsLoading(false);
		navigate("/");
	};

	return (
		<AuthForm
			title="Login page"
			isLoading={isLoading}
			setIsLoading={setIsLoading}
			handler={handleSubmit}
		>
			<div>
				<label>Login</label>
				<Input
					value={userLogin}
					onChange={(e) => setuserLogin(e.target.value.trim())}
					disabled={isLoading}
					required
				/>
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

			<Button disabled={userLogin === "" || userPassword === "" || isLoading} type="submit">
				Login
			</Button>

			<p>
				No account? <Link to="/register">Register</Link>
			</p>
		</AuthForm>
	);
};

export default LoginPage;
