import { useEffect, useState } from 'react';
import { getPhotoUrl } from '../photoApi';

const useSecurePhoto = (photo_uuid: string, postfix: string) => {
	const [blobUrl, setBlobUrl] = useState<string>("");

	console.log("use secure photo", photo_uuid, postfix)

	useEffect(() => {
		let isMounted = true;
		let url = "";

		getPhotoUrl(photo_uuid, postfix)
			.then((objectUrl) => {
				if (isMounted) {
					setBlobUrl(objectUrl);
				}
				url = objectUrl;
			})
			.catch((err) => console.error("Error loading image secure src:", err));

		return () => {
			isMounted = false;
			if (url) {
				URL.revokeObjectURL(url);
			}
		};
	}, [photo_uuid, postfix]);

	return blobUrl
}

export default useSecurePhoto;
