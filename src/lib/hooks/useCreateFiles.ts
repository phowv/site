import { useState } from "react";
import type { UploadingFile, UploadingFileUniversalMetadata } from "../api/photoApi";

type useCreateFilesRes = {
	files: UploadingFile[];
	setFiles: React.Dispatch<React.SetStateAction<UploadingFile[]>>;
	addFiles: (f: File[], m: UploadingFileUniversalMetadata) => void;
};

const useCreateFiles = (): useCreateFilesRes => {
	const [files, setFiles] = useState<Array<UploadingFile>>([]);

	const addFiles = (selectedFiles: Array<File>, metadata: UploadingFileUniversalMetadata) => {
		setFiles((prev) => {
			const incoming = selectedFiles
				.filter((file) => file.type.startsWith("image/"))
				.filter((file) => prev.findIndex((f) => f.file.name === file.name) === -1)
				.map((file): UploadingFile => ({
					file,
					isUploaded: false,
					status: "pending",
					metadata: metadata,
				}));
			return [...prev, ...incoming];
		});
	};

	return { files, setFiles, addFiles };
};

export default useCreateFiles;
