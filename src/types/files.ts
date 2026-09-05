export interface UploadingFileMetadata {
	title?: string;
	description?: string;
	tag_uuids?: string[];
}

export interface UploadingFile {
	file: File;
	metadata: UploadingFileMetadata;
	isUploaded: boolean;
	status?: "uploading" | "uploaded" | "error";
}