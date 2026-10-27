import type React from "react";
import useSecurePhoto from "../../../lib/hooks/useSecurePhoto";
import Image from "../Image/Image";

interface SecureImageProps {
	photoUuid: string;
	photoSize?: string;
	accessKey: string;
	open: () => void;
	onLoad?: () => void;
	containerStyle?: React.CSSProperties;
}

const SecureImage = ({ photoUuid, photoSize, accessKey, open, onLoad, containerStyle }: SecureImageProps) => {
	const url = useSecurePhoto(photoUuid, accessKey, photoSize);

	if (url === "") {
		return <p>Image is not loaded</p>;
	}

	return <Image open={open} src={url} onLoad={onLoad} containerStyle={containerStyle}/>;
};

export default SecureImage;
