import { useEffect, useState, type SyntheticEvent } from 'react';
import { useAuth } from '../auth/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';

const LoginPage = () => {
	const {login, isLoading} = useAuth()
	const navigate = useNavigate()

  const [userLogin, setuserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

	const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ login: userLogin, password: userPassword });
      navigate("/");
    } catch {
      setError("Invalid login or password");
    }
  };

	return (
		<div>
			<h1>Login page</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Login</label>
					<Input value={userLogin} onChange={(e) => setuserLogin(e.target.value)} required/>
				</div>

				<div>
					<label>Password</label>
					<Input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required/>
				</div>

				<Button isActive={!isLoading} type="submit">Login</Button>
			</form>

			<p>
        No account? <Link to="/register">Register</Link>
      </p>

			{
				isLoading && <p>Loading...</p>
			}
		</div>
	);
}

export default LoginPage;
