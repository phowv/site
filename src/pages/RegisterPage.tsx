import { useState, type SyntheticEvent } from 'react';
import { useAuth } from '../auth/authContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';

const RegisterPage = () => {
	const {register, isLoading} = useAuth()
	const navigate = useNavigate()

  const [userLogin, setuserLogin] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [error, setError] = useState("");

	const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register({ login: userLogin, email: userEmail, password: userPassword, description: userDescription });
			localStorage.setItem("register_user_login", userLogin);
      navigate("/register/verify");
    } catch (error: any) {
      setError("invalid code");
    }
  };

	return (
		<div>
			<h1>Register page</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Login</label>
					<Input value={userLogin} onChange={(e) => setuserLogin(e.target.value.trim())} required/>
				</div>

				<div>
					<label>Password</label>
					<Input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value.trim())} required/>
				</div>

				<div>
					<label>Email</label>
					<Input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value.trim())} required/>
				</div>

				<div>
					<label>Description (optional)</label>
					<Input value={userDescription} onChange={(e) => setUserDescription(e.target.value)}/>
				</div>

				<Button isActive={!isLoading} disabled={isLoading} type="submit">Register</Button>
			</form>
		</div>
	);
}

export default RegisterPage;
