import { LRUCache } from "lru-cache/raw";

export const photoCache = new LRUCache<string, string>({
	max: 200,
	ttl: 15 * 60 * 1000,
});

export function toKey(photoUuid: string, photoSize?: string): string {
	return `${photoUuid}:${photoSize ?? "raw"}`;
}
