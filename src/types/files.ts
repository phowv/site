import type { AccessModifier } from "./accessModifier";

export interface UploadingFileMetadata {
	title?: string;
	description?: string;
	tag_uuids?: string[];
	access_level: AccessModifier;
}

export interface UploadingFile {
	file: File;
	metadata: UploadingFileMetadata;
	isUploaded: boolean;
	status?: "uploading" | "uploaded" | "error";
}