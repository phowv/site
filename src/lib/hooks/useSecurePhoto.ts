import { useEffect, useState } from 'react';
import { getPhotoUrl } from '../api/photoApi';

const useSecurePhoto = (photo_uuid: string, access_key: string, photo_size?: string) => {
	const [blobUrl, setBlobUrl] = useState<string>("");

	useEffect(() => {
		let isMounted = true;
		let url = "";

		getPhotoUrl(photo_uuid, access_key, photo_size)
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
	}, [photo_uuid, access_key, photo_size]);

	return blobUrl
}

export default useSecurePhoto;
