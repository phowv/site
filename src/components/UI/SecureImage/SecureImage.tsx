import useSecurePhoto from "../../../lib/hooks/useSecurePhoto";
import Image from "../Image/Image";

interface SecureImageProps {
	photoUuid: string;
	photoSize?: string;
	accessKey: string;
	open: () => void;
	onLoad?: () => void;
}

const SecureImage = ({ photoUuid, photoSize, accessKey, open, onLoad }: SecureImageProps) => {
	const url = useSecurePhoto(photoUuid, accessKey, photoSize);

	if (url === "") {
		return <p>Image is not loaded</p>;
	}

	return <Image open={open} src={url} onLoad={onLoad} />;
};

export default SecureImage;
