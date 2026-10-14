import { useBlocker } from "react-router-dom";
import FormModal from "../FormModal/FormModal";
import Button from "../UI/Button/Button";
import { useUnloadGuard } from "../../lib/hooks/useUnloadGuard";

interface UnsavedGuardProps {
	when: boolean;
	message?: string;
}

const UnsavedGuard = ({ when, message }: UnsavedGuardProps) => {
	useUnloadGuard(when);
	const blocker = useBlocker(when);

	if (blocker.state !== "blocked") return null;

	return (
		<FormModal visible={true} close={blocker.reset}>
			<p>{message ?? "You have unsaved changes. Leave without saving?"}</p>
			<Button onClick={blocker.reset}>Stay</Button>
			<Button onClick={blocker.proceed}>Leave</Button>
		</FormModal>
	);
};

export default UnsavedGuard;
