import type { AccessModifier } from "./accessModifier";

export interface UploadingCollectionMetadata {
	title: string;
	description?: string;
	access_level: AccessModifier;
}