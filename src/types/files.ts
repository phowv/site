export interface UploadingFileMetadata {
	title: string | undefined;
	description: string | undefined;
}

export interface UploadingFile {
	file: File;
	metadata: UploadingFileMetadata;
	isUploaded: boolean;
	status?: "uploading" | "uploaded" | "error";
}