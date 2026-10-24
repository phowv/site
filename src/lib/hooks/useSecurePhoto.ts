import { useEffect, useState } from "react";
import { getPhotoUrl } from "../api/photoApi";
import { photoCache, toKey } from "../cache/photoCache";

const useSecurePhoto = (photoUuid: string, accessKey: string, photoSize?: string): string => {
	const [blobUrl, setBlobUrl] = useState<string>("");

	useEffect(() => {
		const cached = photoCache.get(toKey(photoUuid, photoSize));

		if (cached) {
			setBlobUrl(cached);
			return;
		}

		getPhotoUrl(photoUuid, accessKey, photoSize)
			.then((objectUrl) => {
				setBlobUrl(objectUrl);
				photoCache.set(toKey(photoUuid, photoSize), objectUrl);
			})
			.catch((err) => console.error("Error loading image secure src:", err));
	}, [photoUuid, accessKey, photoSize]);

	return blobUrl;
};

export default useSecurePhoto;
