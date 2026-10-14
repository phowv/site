import React from "react";
import useSecurePhoto from "../../../lib/hooks/useSecurePhoto";

interface SecureImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	photoUuid: string;
	photoSize?: string;
	accessKey: string;
	onLoad?: () => {};
}

const SecureImg = ({ photoUuid, accessKey, photoSize, onLoad, ...props }: SecureImgProps) => {
	const src = useSecurePhoto(photoUuid, accessKey, photoSize);

	if (src === "") {
		return <p>Image is not loaded</p>;
	}

	return <img src={src} {...props} onLoad={onLoad} />;
};

export default SecureImg;
