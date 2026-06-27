import { useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import { verifyUser } from '../lib/authApi';

const VerificaticationPage = () => {
	const [code, setCode] = useState("");
  const [error, setError] = useState("");
	const navigate = useNavigate()

	const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
			const userLogin = localStorage.getItem("register_user_login");
			if (userLogin === null) {
				throw new Error("registration user not found")
			}

			await verifyUser({login: userLogin, code: code});
      navigate("/login");
    } catch (error: any) {
      setError(String(error));
    }
  };

	return (
		<div>
			<h1>Verification page</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Verification code</label>
					<Input value={code} onChange={(e) => setCode(e.target.value.trim())} required/>
				</div>

				<Button isActive={true} type="submit">Verify</Button>
			</form>
		</div>
	);
}

export default VerificaticationPage;
