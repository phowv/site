import React from 'react';
import useSecurePhoto from '../../../lib/hooks/useSecurePhoto';

interface SecureImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	photoUuid: string;
	photoSize?: string;
	accessKey: string;
}

const SecureImg = ({ photoUuid, accessKey, photoSize, ...props }: SecureImgProps) => {
	const src = useSecurePhoto(photoUuid, accessKey, photoSize);

	if (src === "") {
		return <p>Image is not loaded</p>
	}
	
	return <img src={src} {...props} />;
};

export default SecureImg;
