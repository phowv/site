import { useEffect } from "react";

const urlCache = new Map<File, { url: string; refs: number }>();

export function acquireBlobUrl(file: File) {
	const cached = urlCache.get(file);

	if (cached) {
		cached.refs++;
		return cached.url;
	}

	const url = URL.createObjectURL(file);
	urlCache.set(file, { url, refs: 1 });
	return url;
}

export function releaseBlobUrl(file: File) {
	const cached = urlCache.get(file);
	if (!cached) return;

	cached.refs--;
	if (cached.refs <= 0) {
		URL.revokeObjectURL(cached.url);
		urlCache.delete(file);
	}
}

const useBlobUrl = (file: File) => {
	const url = acquireBlobUrl(file);

	useEffect(() => {
		return () => releaseBlobUrl(file);
	}, []);

	return url;
};

export default useBlobUrl;
