import React from 'react';
import useSecurePhoto from '../../../lib/hooks/useSecurePhoto';

interface SecureImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	photoUuid: string;
	postfix: string;
}

const SecureImg = ({ photoUuid, postfix, ...props }: SecureImgProps) => {
	const src = useSecurePhoto(photoUuid, postfix);
	
	return <img src={src} {...props} />;
};

export default SecureImg;
