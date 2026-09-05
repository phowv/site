import useSecurePhoto from "../../../lib/hooks/useSecurePhoto";
import Image from "../Image/Image";

interface SecureImageProps {
	photoUuid: string;
	postfix: string;
	open: () => void;
}

const SecureImage = ({ photoUuid, postfix, open }: SecureImageProps) => {
	const url = useSecurePhoto(photoUuid, postfix)

	return <Image open={open} src={url}/>;
}

export default SecureImage;