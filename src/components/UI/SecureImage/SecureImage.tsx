import useSecurePhoto from "../../../lib/hooks/useSecurePhoto";
import Image from "../Image/Image";

interface SecureImageProps {
	photoUuid: string;
	photoSize?: string;
	accessKey: string;
	open: () => void;
}

const SecureImage = ({ photoUuid, photoSize, accessKey, open }: SecureImageProps) => {
	const url = useSecurePhoto(photoUuid, accessKey, photoSize)

	return <Image open={open} src={url}/>;
}

export default SecureImage;